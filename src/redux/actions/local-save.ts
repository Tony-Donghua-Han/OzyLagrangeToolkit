/* eslint-disable @typescript-eslint/no-explicit-any */
import { lookUpShipById } from "../../components/data/ship-data";
import { getUnitLimit } from "../../components/data/ship-data-types";
import acquiredBluePrintReducer from "../acquired-blue-print";
import { RootState } from "../core/store";
import fleetPlannerReducer from "../fleet-planner";
import timerGroupReducer from "../timer-group";
import { BPDisplayMode } from "../types/acquired-blue-print.type";
import { FleetPlan, FleetType } from "../types/fleet-planner.type";
import { addAccount } from "./game-account";

export const STATE_VERSION = "6";

export function writeState(state: Partial<RootState>) {
    const serializedState = JSON.stringify(state);
    const previousVersion = localStorage.getItem("stateVersion");
    localStorage.setItem("stateVersion", STATE_VERSION);
    try {
        localStorage.setItem("state", serializedState);
    } catch (error) {
        if (previousVersion === null) localStorage.removeItem("stateVersion");
        else localStorage.setItem("stateVersion", previousVersion);
        throw error;
    }
}

export const saveState = (state: RootState) => {
    try {
        writeState(state);
    } catch {
        console.warn("Save state error.");
    }
};

export function loadState(): Partial<RootState> | undefined {
    try {
        const serializedState = localStorage.getItem("state");
        const version = localStorage.getItem("stateVersion");
        if (serializedState === null) {
            return undefined;
        }
        return prepareSavedState(JSON.parse(serializedState), version);
    } catch (err) {
        console.warn("Error loading state.", err);
        return undefined;
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireRecord(value: unknown): Record<string, unknown> {
    if (!isRecord(value)) throw new Error("Invalid save data");
    return value;
}

function requireList(value: unknown): unknown[] {
    if (!Array.isArray(value)) throw new Error("Invalid save data");
    return value;
}

function normalizeFleetEntries(entries: unknown) {
    requireList(entries).forEach((value) => {
        const ship = requireRecord(value);
        if (typeof ship.shipId !== "string" || ship.shipId.length === 0 || typeof ship.variant !== "number") {
            throw new Error("Invalid fleet entry");
        }
        if (Array.isArray(ship.count)) {
            const shipData = lookUpShipById(ship.shipId);
            const legacyCount = ship.count[ship.variant];
            const currentLimit = shipData ? getUnitLimit(shipData, ship.variant) : 0;
            ship.count = Number.isInteger(legacyCount) && legacyCount >= 0 ? legacyCount : currentLimit;
        }
        if (typeof ship.count !== "number" || !Number.isInteger(ship.count) || ship.count < 0) {
            throw new Error("Invalid fleet count");
        }
        ship.adjusted ??= false;
        ship.leveled ??= false;
    });
}

export function prepareSavedState(value: unknown, version: unknown): Partial<RootState> {
    if (version !== null && (typeof version !== "string" || !/^[1-6]$/.test(version))) {
        throw new Error("Unsupported save version");
    }
    const state = requireRecord(value);
    const gameAccount = requireRecord(state.gameAccount);
    if (version === STATE_VERSION) {
        ["timerGroup", "taskTimeStamp", "acquiredBluePrint", "selectedAccount", "fleetPlanner"].forEach((key) =>
            requireRecord(state[key]),
        );
    }
    updateState(version, state);

    const timerGroup = requireRecord(state.timerGroup ?? {});
    const taskTimeStamp = requireRecord(state.taskTimeStamp ?? {});
    const acquiredBluePrint = requireRecord(state.acquiredBluePrint ?? {});
    const fleetPlanner = requireRecord(state.fleetPlanner ?? {});
    const selectedAccount = requireRecord(state.selectedAccount ?? {});

    Object.entries(gameAccount).forEach(([id, accountValue]) => {
        const account = requireRecord(accountValue);
        if (!id || id in Object.prototype || account.id !== id || typeof account.name !== "string") {
            throw new Error("Invalid account");
        }
        const action = { type: addAccount.type, payload: { id, name: account.name } };
        const timerDefaults = timerGroupReducer(undefined, action)[id];
        const group = { ...timerDefaults, ...requireRecord(timerGroup[id] ?? {}) };
        (["construction", "baseUpgrade", "ship", "miner", "capitalShip", "research", "agreement"] as const).forEach(
            (key) => {
                if (!requireList(group[key]).every((timerId) => typeof timerId === "string")) {
                    throw new Error("Invalid timer group");
                }
            },
        );
        timerGroup[id] = group;

        const blueprintDefaults = acquiredBluePrintReducer(undefined, action)[id];
        const blueprint = { ...blueprintDefaults, ...requireRecord(acquiredBluePrint[id] ?? {}) };
        requireList(blueprint.ships).forEach((shipValue) => {
            const ship = requireRecord(shipValue);
            if (
                typeof ship.id !== "string" ||
                ship.id in Object.prototype ||
                !requireList(ship.variants).every((variant) => Number.isInteger(variant))
            ) {
                throw new Error("Invalid ship blueprint");
            }
            ship.partialComplete = requireRecord(ship.partialComplete ?? {});
        });
        requireList(blueprint.superCapitals).forEach((shipValue) => {
            const ship = requireRecord(shipValue);
            if (
                typeof ship.id !== "string" ||
                ship.id in Object.prototype ||
                !requireList(ship.modules).every((module) => typeof module === "string")
            ) {
                throw new Error("Invalid super capital blueprint");
            }
        });
        acquiredBluePrint[id] = blueprint;

        const fleetDefaults = fleetPlannerReducer(undefined, action)[id];
        const plan = { ...fleetDefaults, ...requireRecord(fleetPlanner[id] ?? {}) };
        requireList(plan.availableShipTypes);
        const fleets = requireList(plan.fleets);
        fleets.forEach((fleetValue) => {
            const fleet = requireRecord(fleetValue);
            if (typeof fleet.name !== "string") throw new Error("Invalid fleet");
            fleet.aircraft ??= [];
            normalizeFleetEntries(fleet.mainFleet);
            normalizeFleetEntries(fleet.reinforcement);
            normalizeFleetEntries(fleet.aircraft);
        });
        const { index, type } = requireRecord(plan.selectedFleet ?? {});
        const firstFleetIndex = fleets.length === 0 ? -1 : 0;
        plan.selectedFleet = {
            index:
                typeof index === "number" && Number.isInteger(index) && index >= 0 && index < fleets.length
                    ? index
                    : firstFleetIndex,
            type: type === FleetType.reinforcement ? type : FleetType.main,
        };
        fleetPlanner[id] = plan;
    });

    Object.values(taskTimeStamp).forEach((timerValue) => {
        const timer = requireRecord(timerValue);
        if (typeof timer.startTime !== "number" || typeof timer.duration !== "number") {
            throw new Error("Invalid timer");
        }
    });
    if (state.angulumCityData !== undefined) {
        const map = requireRecord(state.angulumCityData);
        requireList(map.cities).forEach((cityValue) => {
            const city = requireRecord(cityValue);
            const pos = requireRecord(city.pos);
            if (
                typeof pos.x !== "number" ||
                typeof pos.y !== "number" ||
                typeof city.level !== "number" ||
                typeof city.submitter !== "string"
            ) {
                throw new Error("Invalid city");
            }
        });
    }
    const currentAccount = selectedAccount.accountId;
    const accountId =
        typeof currentAccount === "string" && Object.hasOwn(gameAccount, currentAccount)
            ? currentAccount
            : Object.keys(gameAccount)[0] ?? "";

    return {
        gameAccount,
        timerGroup,
        taskTimeStamp,
        acquiredBluePrint,
        selectedAccount: { accountId },
        fleetPlanner,
        angulumCityData: state.angulumCityData,
    } as Partial<RootState>;
}

function updateState(currentVersion: string | null, state: any): void {
    let version = currentVersion;
    if (version === null) {
        Object.keys(state.gameAccount).forEach((key) => {
            delete state.gameAccount[key].battle;
            state.gameAccount[key].agreement = [];
        });
        version = "1";
    }
    if (version === "1") {
        delete state.operation;
        delete state.operationTimeStamp;
        if (state.timerGroup === undefined) state.timerGroup = {};
        Object.keys(state.gameAccount).forEach((key) => {
            const account = state.gameAccount[key];
            const timerGroup = { ...account };
            delete timerGroup.name;
            const newAccountState = { id: account.id, name: account.name };
            state.timerGroup[key] = timerGroup;
            state.gameAccount[key] = newAccountState;
        });
        version = "2";
    }
    if (version === "2") {
        if (state.acquiredBluePrint === undefined) state.acquiredBluePrint = {};
        Object.keys(state.gameAccount).forEach((key) => {
            if (state.acquiredBluePrint[key]) return;
            const { id } = state.gameAccount[key];
            state.acquiredBluePrint[key] = {
                accountId: id,
                superCapitals: [],
                ships: [],
                aircraft: [],
            };
        });
        version = "3";
    }
    if (version === "3") {
        Object.keys(state.acquiredBluePrint).forEach((key) => {
            const blueprint = state.acquiredBluePrint[key];
            if (blueprint.bpEditLock === undefined) blueprint.bpEditLock = false;
            if (blueprint.displayMode === undefined) blueprint.displayMode = BPDisplayMode.percent;
        });
        version = "4";
    }
    if (version === "4") {
        Object.keys(state.acquiredBluePrint).forEach((key) => {
            const blueprint = state.acquiredBluePrint[key];
            if (blueprint.bpEditLock === undefined) blueprint.bpEditLock = false;
            if (blueprint.displayMode === undefined) blueprint.displayMode = BPDisplayMode.percent;
        });
        version = "5";
    }
    if (version === "5") {
        if (state.fleetPlanner) {
            Object.values(state.fleetPlanner).forEach((fleetPlan) => {
                const plan = fleetPlan as FleetPlan;
                plan.onlyDisplayOwned ??= true;
                plan.displayControl ??= true;
                plan.fleets?.forEach((fleet) => {
                    fleet.aircraft ??= [];
                });
            });
        }
    }
}
