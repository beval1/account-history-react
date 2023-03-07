import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IEventByCustomer } from "../api/models/IEventByCustomer";
import { Button, Divider, TableFooter } from "@mui/material";
import { IPage } from "../api/models/IPage";

function Row(props: { row: IEventByCustomer }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.customerId}
                </TableCell>
                <TableCell align="right">{row.accountId}</TableCell>
                <TableCell align="right">{row.eventType}</TableCell>
                <TableCell align="right">{row.actor}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Parameters
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.parameters == undefined
                                        ? null
                                        : row.parameters.map((parameters) => (
                                              <TableRow
                                                  key={parameters.parameterName}
                                              >
                                                  <TableCell
                                                      component="th"
                                                      scope="row"
                                                  >
                                                      {parameters.parameterName}
                                                  </TableCell>
                                                  <TableCell>
                                                      {
                                                          parameters.parameterValue
                                                      }
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

type Props = {
    pages: IPage<IEventByCustomer>[];
    pageNumber: number;
    pageCount: number;
    onNext: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onPrev: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function EventByCustomerTable(props: Props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow
                        sx={(theme) => ({
                            backgroundColor: theme.palette.secondary.main,
                        })}
                    >
                        <TableCell />
                        <TableCell sx={{ color: "white" }}>
                            CustomerId
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            AccountId
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            EventType&nbsp;
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            Actor&nbsp;
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                            Timestamp&nbsp;
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.pages.length > 0
                        ? props.pages[props.pages.length - 1].content.map(
                              (row, i) => <Row key={i} row={row} />
                          )
                        : null}
                </TableBody>
                {props.pageNumber == 0 ? null :
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
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
