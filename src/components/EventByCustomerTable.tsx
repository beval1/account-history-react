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

// export function createData(eventByCustomer: IEventByCustomer) {
//   return eventByCustomer;
// }

function Row(props: { row: IEventByCustomer}) {
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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.customerId}
        </TableCell>
        <TableCell align="right">{row.accountId}</TableCell>
        <TableCell align="right">{row.eventType}</TableCell>
        <TableCell align="right">{row.actor}</TableCell>
        <TableCell align="right">{row.eventTimestamp.toISOString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
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
                  {row.eventParameters.map((parameters) => (
                    <TableRow key={parameters.parameterName}>
                      <TableCell component="th" scope="row">
                        {parameters.parameterName}
                      </TableCell>
                      <TableCell>{parameters.parameterValue}</TableCell>
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
  rows: IEventByCustomer[];
};

export default function EventByCustomerTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow
            sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}
          >
            <TableCell />
            <TableCell sx={{color: "white"}} >CustomerId</TableCell>
            <TableCell sx={{color: "white"}} align="right">AccountId</TableCell>
            <TableCell sx={{color: "white"}} align="right">EventType&nbsp;</TableCell>
            <TableCell sx={{color: "white"}} align="right">Actor&nbsp;</TableCell>
            <TableCell sx={{color: "white"}} align="right">Timestamp&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
