import { createSelector } from "@reduxjs/toolkit";
import { UNIT_DATA_BASE } from "../../components/data/ship-data";
import { RootState } from "../core/store";

export const selectCruiserBlueprintReport = createSelector(
    (state: RootState) => state.gameAccount,
    (state: RootState) => state.acquiredBluePrint,
    (gameAccounts, blueprints) => {
        const accounts = Object.values(gameAccounts);
        const ownedByAccount = accounts.map(({ id }) => {
            const ships = blueprints[id]?.ships ?? [];
            return new Map(ships.map((ship) => [ship.id, ship.variants]));
        });
        const rows = UNIT_DATA_BASE.cruisers.list.flatMap((ship) =>
            ship.variants.map((variant, index) => ({
                id: `${ship.id}-${index}`,
                label: variant ? `${ship.name} - ${variant}` : ship.name,
                owned: ownedByAccount.map((ships) => ships.get(ship.id)?.includes(index) ?? false),
            })),
        );
        return { accounts, rows };
    },
);
