import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useAppSelector } from "../redux/utils/hooks";
import "./css/blue-print-report.css";
import { selectCruiserBlueprintReport } from "../redux/selector/blue-print-report.selector";
import NoAccountWarning from "./no-account-warning";

function BluePrintReport(): JSX.Element {
    const { accounts, rows } = useAppSelector(selectCruiserBlueprintReport);
    if (accounts.length === 0) return <NoAccountWarning />;

    return (
        <Container maxWidth={false} className="container-main-blue-print-report">
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>巡洋舰型号</TableCell>
                            {accounts.map(({ id, name }) => (
                                <TableCell key={id} align="center">
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(({ id, label, owned }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">
                                    {label}
                                </TableCell>
                                {accounts.map((account, index) => (
                                    <TableCell key={account.id} align="center">
                                        {owned[index] ? "已拥有" : ""}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default BluePrintReport;
