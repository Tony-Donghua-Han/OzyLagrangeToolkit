import { ShipTypes } from "../../components/data/ship-data-types";

export interface AcquiredSuperCap {
    id: string;
    techPoint: number;
    modules: string[];
}

export interface AcquiredShip {
    id: string;
    techPoint: number;
    variants: number[];
}

export interface AcquiredAircraft {
    id: string;
    techPoint: number;
}

export interface AddRemoveShipAction {
    accountId: string;
    shipId: string;
    variant: number;
}

export interface AddRemoveAircraftAction {
    accountId: string;
    aircraftId: string;
}

export interface AddRemoveSuperCapAction {
    accountId: string;
    superCapId: string;
}

export interface AddRemoveModel {
    accountId: string;
    superCapId: string;
    moduleId: string;
}

export interface UpdateTechPoint {
    accountId: string;
    shipId: string;
    shipType: ShipTypes;
    techPoint: number;
}

export interface BluePrintReport {
    totalTechPoint: number;
    acquiredBluePrint: number;
    totalBluePrint: number;
}
