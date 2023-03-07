import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { EventType } from '../api/models/EventTypeEnum'
import IEventByActor from '../api/models/IEventByActor'

type Props = {
    data: IEventByActor | null
}

function EventByActorTable(props: Props) {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
                <TableCell sx={{color: "white"}}>Actor</TableCell>
                <TableCell sx={{color: "white"}} align="right">Event Type</TableCell>
                <TableCell sx={{color: "white"}} align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data ? props.data.countPerEvent.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {props.data!.actor}
                  </TableCell>
                  <TableCell align="right">{EventType[row.eventType]}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default EventByActorTable