import { loadState, STATE_VERSION } from "./local-save";
import { importStateIntoLocalStorage } from "./state-import-export";

function backupFile(state: unknown, stateVersion = STATE_VERSION) {
    return Object.assign(new File([], "backup.json"), {
        text: async () => JSON.stringify({ state, stateVersion }),
    });
}

const currentState = {
    gameAccount: { sample: { id: "sample", name: "\u8266\u968a\u6e2c\u8a66" } },
    timerGroup: {},
    taskTimeStamp: {},
    acquiredBluePrint: {},
    selectedAccount: { accountId: "sample" },
    fleetPlanner: {},
};

beforeEach(() => {
    localStorage.clear();
});

test("restores a UTF-8 backup and converts array counts for the saved variant", async () => {
    const ship = { shipId: "c10", variant: 2, count: [8, 8, 1] };
    const state = {
        ...currentState,
        fleetPlanner: {
            sample: {
                fleets: [{ name: "Test fleet", mainFleet: [ship], reinforcement: [], aircraft: [] }],
                selectedFleet: { index: 9, type: null },
            },
        },
    };

    await importStateIntoLocalStorage(backupFile(state));

    const restored = loadState();
    expect(restored?.gameAccount?.sample.name).toBe(currentState.gameAccount.sample.name);
    expect(restored?.fleetPlanner?.sample.fleets[0].mainFleet[0].count).toBe(1);
    expect(restored?.fleetPlanner?.sample.selectedFleet).toEqual({ index: 0, type: 0 });
});

test("rejects a damaged backup without replacing the current save", async () => {
    await importStateIntoLocalStorage(backupFile(currentState));
    const original = localStorage.getItem("state");

    await expect(importStateIntoLocalStorage(backupFile(null))).rejects.toThrow();
    await expect(
        importStateIntoLocalStorage(backupFile({ ...currentState, fleetPlanner: { sample: { fleets: [null] } } })),
    ).rejects.toThrow();

    expect(localStorage.getItem("state")).toBe(original);
    expect(localStorage.getItem("stateVersion")).toBe(STATE_VERSION);
});

test("starts with defaults when an existing save is unreadable", () => {
    localStorage.setItem("state", "null");
    localStorage.setItem("stateVersion", STATE_VERSION);
    const warning = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
        expect(loadState()).toBeUndefined();
        expect(localStorage.getItem("state")).toBe("null");
    } finally {
        warning.mockRestore();
    }
});

test("preserves timer links when restoring a version 1 backup", async () => {
    await importStateIntoLocalStorage(
        backupFile(
            {
                gameAccount: { sample: { id: "sample", name: "Legacy", construction: ["timer1"] } },
                taskTimeStamp: { timer1: { id: "timer1", startTime: 1, duration: 60000 } },
            },
            "1",
        ),
    );

    const restored = loadState();
    expect(restored?.timerGroup?.sample.construction).toEqual(["timer1"]);
    expect(restored?.taskTimeStamp?.timer1.duration).toBe(60000);
    expect(restored?.acquiredBluePrint?.sample.ships).toEqual([]);
    expect(restored?.selectedAccount?.accountId).toBe("sample");
});
