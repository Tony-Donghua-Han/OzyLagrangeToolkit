import { RootState } from "../core/store";
import { prepareSavedState, STATE_VERSION, writeState } from "./local-save";

export interface VersionedState {
    state: RootState;
    stateVersion: string;
}

export function getStateExportLink(state: RootState): string {
    const versionedState: VersionedState = { state, stateVersion: STATE_VERSION };
    const blob = new Blob([JSON.stringify(versionedState)], { type: "application/json" });
    return window.URL.createObjectURL(blob);
}

export async function importStateIntoLocalStorage(file: File) {
    const data: Partial<VersionedState> | null = JSON.parse(await file.text());
    writeState(prepareSavedState(data?.state, data?.stateVersion));
}
