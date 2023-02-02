import { Table, TableHead, TableRow, TableBody, TableCell, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ScienceIcon from "@mui/icons-material/Science";
import { displayControl } from "../redux/selector/fleet-planner.selector";
import { useAppDispatch, useAppSelector } from "../redux/utils/hooks";
import "./css/fleet-plan.css";
import {
    AircraftInFleet,
    decreaseShipCount,
    Fleet,
    FleetType,
    flipAdjustedFlag,
    flipLeveledFlag,
    increaseShipCount,
    removeShipOrAircraft,
} from "../redux/fleet-planner";
import { getSelectedAccountId } from "../redux/selected-account";
import { lookUpShipById } from "./data/ship-data";
import { isShipData, ShipTypes } from "./data/ship-data-types";
import { EditRemoveShipOrAircraft } from "../redux/types/fleet-planner.type";
import { AirCapacity } from "./data/air-capacity";

export function FleetPlanAircraftTable(props: { fleet: Fleet; fleetIndex: number }): JSX.Element | null {
    const { fleet, fleetIndex } = props;
    const capacity: AirCapacity = { corvette: 0, midAir: 0, heavyAir: 0 };

    let aircraftCount = 0;
    let corvetteCount = 0;

    const hideAircraftTable: boolean =
        fleet.aircraft.length < 1 && capacity.corvette === 0 && capacity.heavyAir === 0 && capacity.midAir === 0;
    if (hideAircraftTable) return null;

    const aircraftRow = fleet.aircraft.map((aircraft, index) => {
        const data = lookUpShipById(aircraft.shipId);
        if (!data) return null;
        if (data.type === ShipTypes.corvette) corvetteCount += aircraft.count;
        else aircraftCount += aircraft.count;
        return <AircraftTableRow aircraft={aircraft} fleetIndex={fleetIndex} aircraftIndex={index} key={index} />;
    });

    return (
        <Table sx={{ width: 510 }} size="small">
            <TableHead>
                <TableCell></TableCell>
                <TableCell align="center">飞机/炮艇</TableCell>
                <TableCell width={35}></TableCell>
                <TableCell align="center" width={75}>
                    {`🚁 ${capacity.midAir + capacity.heavyAir} (${capacity.heavyAir})`}
                </TableCell>
                <TableCell align="center" width={40}>
                    🚤 {capacity.corvette}
                </TableCell>
            </TableHead>
            <TableBody>
                {aircraftRow}
                <TableRow>
                    <TableCell colSpan={2} className="no-border"></TableCell>
                    <TableCell>合计</TableCell>
                    <TableCell align="center">{aircraftCount}</TableCell>
                    <TableCell align="center">{corvetteCount}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

function AircraftTableRow(props: {
    aircraft: AircraftInFleet;
    fleetIndex: number;
    aircraftIndex: number;
}): JSX.Element | null {
    const accountId = useAppSelector(getSelectedAccountId);
    const showControl = useAppSelector(displayControl);
    const dispatch = useAppDispatch();

    const { aircraft, fleetIndex, aircraftIndex: shipIndex } = props;
    const { shipId, count, variant, leveled, adjusted } = aircraft;
    const type = FleetType.aircraft;

    function handleRemoveAircraft() {
        const action: EditRemoveShipOrAircraft = { accountId, shipIndex, fleetIndex, type };
        dispatch(removeShipOrAircraft(action));
    }

    function handleIncreaseCount() {
        const action: EditRemoveShipOrAircraft = { accountId, shipIndex, fleetIndex, type };
        dispatch(increaseShipCount(action));
    }

    function handleDecreaseCount() {
        const action: EditRemoveShipOrAircraft = { accountId, shipIndex, fleetIndex, type };
        dispatch(decreaseShipCount(action));
    }

    function handleLeveled() {
        const action: EditRemoveShipOrAircraft = { accountId, shipIndex, fleetIndex, type };
        dispatch(flipLeveledFlag(action));
    }

    function handleAdjusted() {
        const action: EditRemoveShipOrAircraft = { accountId, shipIndex, fleetIndex, type };
        dispatch(flipAdjustedFlag(action));
    }

    const data = lookUpShipById(shipId);
    if (!data) return null;
    const isCorvette = data.type === ShipTypes.corvette;
    let addOn = "";
    if (isShipData(data) && data.variants[0] !== "") addOn = ` - ${data.variants[variant]}`;

    const controlCell: JSX.Element = (
        <TableCell width={110}>
            <IconButton color="success" size="small" onClick={handleIncreaseCount} disabled={count >= data.limit}>
                <AddIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={handleDecreaseCount} disabled={count <= 0}>
                <RemoveIcon />
            </IconButton>
            <IconButton color="warning" size="small" onClick={handleRemoveAircraft}>
                <DeleteOutlineIcon />
            </IconButton>
        </TableCell>
    );

    const tagCell: JSX.Element = (
        <TableCell width={60}>
            <IconButton size="small" color={leveled ? "warning" : "default"} onClick={handleLeveled}>
                <MilitaryTechIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" color={adjusted ? "primary" : "default"} onClick={handleAdjusted}>
                <ScienceIcon fontSize="inherit" />
            </IconButton>
        </TableCell>
    );

    return (
        <TableRow>
            {showControl ? controlCell : tagCell}
            <TableCell colSpan={2}>{`${data.name}${addOn}`}</TableCell>
            <TableCell align="center">{isCorvette ? null : count}</TableCell>
            <TableCell align="center">{isCorvette ? count : null}</TableCell>
        </TableRow>
    );
}
