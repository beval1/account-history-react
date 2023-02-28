import { Box, CircularProgress, Divider } from '@mui/material'
import React, { useState } from 'react'
import { getEventsByActor, ParametersByActor } from '../api/ApiClient'
import { EventType } from '../api/models/EventTypeEnum'
import IEventByActor from '../api/models/IEventByActor'
import { IPage } from '../api/models/IPage'
import CustomRangePicker from '../components/CustomRangePicker'
import EventByActorTable from '../components/EventByActorTable'
import SearchButton from '../components/SearchButton'
import StyledTextField from '../components/StyledTextField'
import { handleInputChange } from '../utility'

type Props = {}

type formProps = {
  actor: string,
  eventType: EventType;
};

function ActorPage(props: Props) {
  const [form, setForm] = useState<formProps>({} as formProps);
  const [rows, setRows] = useState<IEventByActor[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSearch = async () => {
    setLoading(true)
    const startDateStr = startDate?.toISOString().split("T")[0];
    const endDateStr = endDate?.toISOString().split("T")[0];
    let params: ParametersByActor = {
        eventType: form.eventType,
        startDate: startDateStr,
        endDate: endDateStr,
    };

    const page: IPage<IEventByActor> = await getEventsByActor(
        form.actor,
        params
    );
    console.log(page);
    setRows(page.content);
    setLoading(false)
};

  return (
    <Box>
            <Box display="flex" flexDirection="column" gap="30px">
                <Box id="filter" display="flex" gap="20px">
                <StyledTextField
                        name="actor"
                        id="actor"
                        label="actor"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                    />
                    <StyledTextField
                        name="eventType"
                        id="eventType"
                        label="eventType"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                    />
                    <CustomRangePicker
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                    ></CustomRangePicker>
                    <SearchButton onClick={handleSearch} />
                </Box>
                <Divider variant="middle" />
                <EventByActorTable rows={rows}></EventByActorTable>
                <CircularProgress
                    size="sm"
                    sx={{
                        display: loading ? "block" : "none",
                        width: "50%",
                        margin: "10px auto",
                    }}
                    color="info"
                />
            </Box>
        </Box>
  )
}

export default ActorPage