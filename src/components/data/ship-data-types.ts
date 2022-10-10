export enum ShipTypes {
    battleCruiser,
    cruiser,
    destroyer,
    frigate,
    aircraft,
    corvette,
}

export interface ShipData {
    id: string;
    name: string;
    variants: string[];
}

export interface AircraftData {
    id: string;
    name: string;
    type: "mid" | "large";
}

export interface SuperCapData {
    id: string;
    name: string;
    modules: {
        [key: string]: SuperCapModule;
    };
}

export interface SuperCapModule {
    id: string;
    name: string;
    isBase: boolean;
    shortName: string;
}

export type UnitDataGroup = ShipDataGroup | SuperCapDataGroup | AircraftDataGroup;

interface ShipDataGroup {
    label: string;
    type: ShipTypes.cruiser | ShipTypes.destroyer | ShipTypes.frigate | ShipTypes.corvette;
    list: ShipData[];
}

interface SuperCapDataGroup {
    label: string;
    type: ShipTypes.battleCruiser;
    list: SuperCapData[];
}

interface AircraftDataGroup {
    label: string;
    type: ShipTypes.aircraft;
    list: AircraftData[];
}

export interface UnitDataBase {
    battleCruisers: SuperCapDataGroup;
    cruisers: ShipDataGroup;
    destroyers: ShipDataGroup;
    frigates: ShipDataGroup;
    aircrafts: AircraftDataGroup;
    corvettes: ShipDataGroup;
}
