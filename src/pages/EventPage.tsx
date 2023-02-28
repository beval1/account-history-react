import { Box, CircularProgress, Divider } from '@mui/material'
import React, { useState } from 'react'
import { getEventsByEvent, ParametersByEvent } from '../api/ApiClient'
import IEventByEventType from '../api/models/IEventByEventType'
import { IPage } from '../api/models/IPage'
import CustomRangePicker from '../components/CustomRangePicker'
import EventByCustomerTable from '../components/EventByCustomerTable'
import EventByEventTypeTable from '../components/EventByEventTypeTable'
import NavigationMenu from '../components/NavigationMenu'
import SearchButton from '../components/SearchButton'
import StyledTextField from '../components/StyledTextField'
import { handleInputChange } from '../utility'

type Props = {}

type formProps = {
  eventType: string;
};

function EventPage({}: Props) {
  const [form, setForm] = useState<formProps>({} as formProps);
  const [rows, setRows] = useState<IEventByEventType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSearch = async () => {
    setLoading(true)
      const startDateStr = startDate?.toISOString().split("T")[0];
      const endDateStr = endDate?.toISOString().split("T")[0];
      let params: ParametersByEvent = {
          startDate: startDateStr,
          endDate: endDateStr,
      };

      const page: IPage<IEventByEventType> = await getEventsByEvent(
          form.eventType,
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
                <EventByEventTypeTable rows={rows}></EventByEventTypeTable>
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

export default EventPage