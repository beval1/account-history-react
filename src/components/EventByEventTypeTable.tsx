import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import IEventByEventType from '../api/models/IEventByEventType'

type Props = {
  rows: IEventByEventType[] 
}

function EventByEventTypeTable(props: Props) {
  const navigate = useNavigate();
  const handleCustomerClick = (e: any, row: IEventByEventType) => {
    navigate(`/customer/${row.customerId}`);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
            <TableCell sx={{color: "white"}}>Event Type</TableCell>
            <TableCell sx={{color: "white"}} align="right">CustomerId</TableCell>
            <TableCell sx={{color: "white"}} align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.eventType}
              </TableCell>
              <TableCell align="right"><Typography component="a" sx={(theme) => ({
                textDecoration: "underline",
                color: theme.palette.secondary.main
              })} onClick={(e) => handleCustomerClick(e, row)}>{row.customerId}</Typography></TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventByEventTypeTable