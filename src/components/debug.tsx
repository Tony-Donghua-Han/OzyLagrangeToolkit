import "./css/debug.css";
import { Container } from "@mui/material";
import ReactJson from "react-json-view";
import { useAppSelector } from "../redux/utils/hooks";

function DevelopmnentDebug() {
    const store = useAppSelector((state) => state);
    let stateStore: object = { nothing: "nothing" };
    let version = null;
    try {
        const serializedState = localStorage.getItem("state");
        version = localStorage.getItem("stateVersion");
        if (serializedState) {
            const value: unknown = JSON.parse(serializedState);
            if (value === null || typeof value !== "object" || Array.isArray(value)) {
                throw new Error("Invalid saved state");
            }
            stateStore = value;
        }
    } catch {
        stateStore = { error: "无法读取本机存档" };
    }
    return (
        <Container maxWidth="xl">
            <div className="debug-content-container">
                <ReactJson src={store} />
                <ReactJson src={stateStore} />
                <div>Version: {version}</div>
            </div>
        </Container>
    );
}

export default DevelopmnentDebug;
