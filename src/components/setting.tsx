import React, { useState } from "react";
import { Alert, Container, Button, IconButton, Input, TextField, Typography } from "@mui/material";
import { Authenticator } from "@aws-amplify/ui-react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CasinoIcon from "@mui/icons-material/Casino";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAppSelector, useAppDispatch } from "../redux/utils/hooks";
import { selectAllAccounts, changeAccountName } from "../redux/game-account";
import "@aws-amplify/ui-react/styles.css";
import "./css/setting.css";
import NoAccountWarning from "./no-account-warning";
import { getStateExportLink, importStateIntoLocalStorage } from "../redux/actions/state-import-export";
import { addAccount as add, removeAccount as remove } from "../redux/actions/game-account";
import { randomName } from "./utils/randomName";

function Setting() {
    const gameAccounts = useAppSelector((state) => selectAllAccounts(state));

    return (
        <Container maxWidth="xl">
            <div className="account-content-container">
                {gameAccounts.length === 0 ? <NoAccountWarning /> : <SettingContent />}
                <AccountManagement />
                <DataManager />
            </div>
        </Container>
    );
}

function AccountManagement() {
    const [editAccountId, setEditAccountId] = useState("");
    const [newAccountName, setNewAccountName] = useState("");
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    const gameAccounts = useAppSelector((state) => selectAllAccounts(state));

    function addAccount() {
        if (name !== "") dispatch(add(name));
        else dispatch(add(randomName()));
        setName("");
    }

    function addRandomAccount() {
        setName("");
        dispatch(add(randomName()));
    }

    function editAccount(id: string) {
        setEditAccountId(id);
        setNewAccountName("");
    }

    function removeAccount(id: string) {
        let subId = "";
        if (gameAccounts.length > 1) {
            const otherAccount = gameAccounts.find((account) => account.id !== id);
            if (otherAccount) subId = otherAccount.id;
        }
        dispatch(remove(id, subId));
    }

    function updateAccountName(event: React.ChangeEvent<HTMLInputElement>) {
        setNewAccountName(event.target.value);
    }

    function handleAccountNameChange(originalName: string) {
        dispatch(changeAccountName({ id: editAccountId, name: newAccountName !== "" ? newAccountName : originalName }));
        setEditAccountId("");
        setNewAccountName("");
    }

    const accountListItems = gameAccounts.map((account) => {
        if (editAccountId !== account.id) {
            return (
                <div key={account.id} className="account-list-line-item grey-themed">
                    <Typography color="white">{account.name}</Typography>
                    <div>
                        <IconButton aria-label="edit" onClick={() => editAccount(account.id)} size="small">
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => removeAccount(account.id)} size="small">
                            <DeleteIcon fontSize="inherit" color="error" />
                        </IconButton>
                    </div>
                </div>
            );
        }
        return (
            <div key={account.id} className="account-list-line-item">
                <div>
                    <Input placeholder={account.name} value={newAccountName} onChange={updateAccountName} />
                </div>
                <div>
                    <IconButton aria-label="edit" onClick={() => handleAccountNameChange(account.name)} size="small">
                        <DoneIcon fontSize="inherit" color="success" />
                    </IconButton>
                </div>
            </div>
        );
    });

    return (
        <div className="account-manager-container">
            <div className="account-manager-header">账号管理</div>
            {accountListItems}
            <div className="container-add-account grey-themed">
                <TextField
                    label="添加账号"
                    variant="standard"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                ></TextField>
                <IconButton className="button-add-account" onClick={addAccount}>
                    <PersonAddIcon />
                </IconButton>
                <IconButton className="button-add-account" onClick={addRandomAccount}>
                    <CasinoIcon />
                </IconButton>
            </div>
        </div>
    );
}

export function DataManager() {
    const exportLink = useAppSelector((state) => getStateExportLink(state));
    const [importing, setImporting] = useState(false);
    const [importFailed, setImportFailed] = useState(false);

    async function handleStateUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        const file = input.files?.[0];
        if (!file) return;
        setImportFailed(false);
        setImporting(true);
        try {
            await importStateIntoLocalStorage(file);
        } catch {
            setImportFailed(true);
            setImporting(false);
            input.value = "";
            return;
        }
        window.location.reload();
    }

    return (
        <div>
            <div className="data-manager-header">数据管理</div>
            <div className="grey-themed">
                <Button component="label" disabled={importing}>
                    导入数据
                    <input type="file" hidden disabled={importing} onChange={handleStateUpload} />
                </Button>
                <Button href={exportLink} download="ozylagrange-backup.json">
                    导出数据
                </Button>
                {importFailed && <Alert severity="error">导入失败，请检查备份文件格式或浏览器储存空间。</Alert>}
            </div>
        </div>
    );
}

export function SettingContent() {
    return (
        <div>
            <div className="data-manager-header">登陆用户</div>
            <Authenticator>
                {({ signOut }) => {
                    return (
                        <div className="grey-themed">
                            <div className="container-add-account">你好</div>
                            <Button onClick={signOut}>登出</Button>
                        </div>
                    );
                }}
            </Authenticator>
        </div>
    );
}

export default Setting;
