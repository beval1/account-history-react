import {
  Box,
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IEventByCustomer } from "../api/models/IEventByCustomer";
import IEventByEventType from "../api/models/IEventByEventType";
import { IPage } from "../api/models/IPage";

type Props = {
    pages: IPage<IEventByEventType>[];
    pageNumber: number;
    pageCount: number;
    onNext: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onPrev: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function EventByEventTypeTable(props: Props) {
    const navigate = useNavigate();
    const handleCustomerClick = (e: any, row: IEventByEventType) => {
        navigate(`/customer/${row.customerId}?eventType=${row.eventType}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={(theme) => ({
                            backgroundColor: theme.palette.secondary.main,
                        })}
                    >
                        <TableCell sx={{ color: "white" }}>
                            Event Type
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            CustomerId
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            Timestamp
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.pages.length > 0
                        ? props.pages[props.pages.length - 1].content.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.eventType}
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    component="a"
                                    sx={(theme) => ({
                                        textDecoration: "underline",
                                        color: theme.palette.secondary.main,
                                    })}
                                    onClick={(e) => handleCustomerClick(e, row)}
                                >
                                    {row.customerId}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{row.timestamp}</TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
                {props.pageNumber == 0 ? null :
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">
                            <Box display="flex" alignItems="center" justifyContent="right" gap="10px">
                                <Typography
                                    component="p"
                                    fontSize="18px"
                                    display="inline-block"
                                >
                                    Total pages: {props.pageCount}
                                </Typography>
                                <Divider orientation="vertical" sx={{color: "black"}} flexItem />
                                <Button
                                    color="secondary"
                                    onClick={props.onPrev}
                                    disabled={props.pageNumber == 1}
                                >
                                    Prev
                                </Button>
                                <Typography
                                    component="p"
                                    fontSize="18px"
                                    display="inline-block"
                                >
                                    {props.pageNumber}
                                </Typography>
                                <Button
                                    color="secondary"
                                    onClick={props.onNext}
                                    disabled={props.pages[props.pages.length-1].pageSize < 10 || props.pageNumber >= props.pageCount}
                                >
                                    Next
                                </Button>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>}
            </Table>
        </TableContainer>
    );
}

export default EventByEventTypeTable;
