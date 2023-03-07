import { Box, CircularProgress, Divider } from "@mui/material";
import React, { useState } from "react";
import { getEventsByEvent, ParametersByEvent } from "../api/ApiClient";
import IEventByEventType from "../api/models/IEventByEventType";
import { IPage } from "../api/models/IPage";
import CustomRangePicker from "../components/CustomRangePicker";
import ErrorAlert from "../components/ErrorAlert";
import EventByCustomerTable from "../components/EventByCustomerTable";
import EventByEventTypeTable from "../components/EventByEventTypeTable";
import SearchButton from "../components/SearchButton";
import StyledTextField from "../components/StyledTextField";
import { convertUTCDateToLocalDate, handleInputChange } from "../utility";

type Props = {};

type formProps = {
    eventType: string;
};

function EventPage({}: Props) {
    const [form, setForm] = useState<formProps>({} as formProps);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<IPage<IEventByEventType>[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const getData = async (
        eventType: string,
        pagingState: string | undefined
    ): Promise<IPage<IEventByEventType> | null> => {
        setLoading(true);
        const startDateStr = convertUTCDateToLocalDate(startDate)?.toISOString().split("T")[0];
        const endDateStr = convertUTCDateToLocalDate(endDate)?.toISOString().split("T")[0];
        let params: ParametersByEvent = {
            startDate: startDateStr,
            endDate: endDateStr,
            pagingState: pagingState,
        };
        let page: IPage<IEventByEventType> | null = null;
        try {
            console.log(`Sending params: ${params.pagingState}`)
            page = await getEventsByEvent(eventType, params);
            console.log(page);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
        return page;
    };

    const handleSearch = async () => {
        if (!form.eventType) {
            setError("You must specify eventType!");
            return null;
        }
        setError(null);
        getData(form.eventType, undefined).then(
            (page: IPage<IEventByEventType> | null) => {
                if (page) {
                    setPages([page]);
                    setPageCount(page.pageCount);
                }
                console.log(pages);
            }
        );
    };

    const handlePrev = () => {
        setPages((prev) => [...prev.slice(0, -1)]);
    };

    const handleNext = async () => {
        getData(form.eventType, pages[pages.length - 1].pagingState).then(
            (data: IPage<IEventByEventType> | null) => {
                if (data) {
                    setPages((prev) => [...prev, data]);
                }
            }
        );
    };

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap="30px">
                <ErrorAlert error={error}></ErrorAlert>
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
                <EventByEventTypeTable
                    pages={pages}
                    pageNumber={pages.length}
                    pageCount={pageCount}
                    onNext={handleNext}
                    onPrev={handlePrev}
                ></EventByEventTypeTable>
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
    );
}

export default EventPage;
