import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Stack, Typography } from "@mui/material";

const createData = (
    peer: string,
    completedAt: number,
    questionsCompleted: number,
    action: number
) => {
    return { peer, completedAt, questionsCompleted, action };
};

const randomColor = () => {
    return (
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
};

const rows = [
    createData("Babs", 159, 6.0, 24),
    createData("Wabs", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49),
];

const HistoryTable = () => {
    return (
        // <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
        // <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow sx={{ bgcolor: "lightgray" }}>
                        <TableCell>Peer</TableCell>
                        <TableCell align="right">Completed At</TableCell>
                        <TableCell align="right">Questions Attempted</TableCell>
                        <TableCell align="right" sx={{ paddingRight: 4 }}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.peer}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Stack
                                    direction="row"
                                    sx={{ alignItems: "center" }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: randomColor(),
                                            width: 25,
                                            height: 25,
                                            marginRight: 2,
                                            paddingLeft: 0.25,
                                            paddingTop: 0.25,
                                            fontSize: 16,
                                        }}
                                    >
                                        {row.peer[0]}
                                    </Avatar>
                                    <Typography variant="subtitle1">
                                        {row.peer}
                                    </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    {row.completedAt}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    {row.questionsCompleted}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Button style={{ textTransform: "none" }}>
                                    <Typography variant="subtitle1">
                                        View
                                    </Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default HistoryTable;
