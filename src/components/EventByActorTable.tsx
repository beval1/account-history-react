import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import IEventByActor from '../api/models/IEventByActor'

type Props = {
    rows: IEventByActor[]
}

function EventByActorTable(props: Props) {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
                <TableCell sx={{color: "white"}}>Actor</TableCell>
                <TableCell sx={{color: "white"}} align="right">Event Type</TableCell>
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
                    {row.actorType}
                  </TableCell>
                  <TableCell align="right">{row.eventType}</TableCell>
                  <TableCell align="right">{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default EventByActorTable