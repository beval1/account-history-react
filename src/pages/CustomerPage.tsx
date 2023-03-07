import {
    Box,
    CircularProgress,
    Divider,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import CustomRangePicker from "../components/CustomRangePicker";
import SearchButton from "../components/SearchButton";
import StyledTextField from "../components/StyledTextField";
import { IEventByCustomer } from "../api/models/IEventByCustomer";
import { getEventsByCustomer, ParametersByCustomer } from "../api/ApiClient";
import { convertUTCDateToLocalDate, handleInputChange } from "../utility";
import EventByCustomerTable from "../components/EventByCustomerTable";
import { IPage } from "../api/models/IPage";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import { NavigationMenuContext } from "../App";

type Props = {};

type formProps = {
    customerId: number;
    accountId: number;
    actor: string;
    eventType: string;
};

function CustomerPage(props: Props) {
    const [form, setForm] = useState<formProps>({} as formProps);
    const [pages, setPages] = useState<IPage<IEventByCustomer>[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    let { customerId } = useParams();
    const [searchParams] = useSearchParams();
    const menuContext = useContext(NavigationMenuContext);

    const getData = async (
        customerId: string,
        eventType: string | null,
        pagingState: string | undefined
    ): Promise<IPage<IEventByCustomer> | null> => {
        let page: IPage<IEventByCustomer> | null = null;
        setLoading(true);
        const startDateStr = convertUTCDateToLocalDate(startDate)?.toISOString().split("T")[0];
        const endDateStr = convertUTCDateToLocalDate(endDate)?.toISOString().split("T")[0];
        let params: ParametersByCustomer = {
            accountId: form.accountId,
            actor: form.actor,
            eventType: eventType || "",
            startDate: startDateStr,
            endDate: endDateStr,
            pagingState: pagingState,
        };
        try {
            page = await getEventsByCustomer(customerId, params);
        } catch (error: any) {
            setError(error.message);
        }

        setLoading(false);
        return page;
    };

    const handleSearch = async () => {
        if (!form.customerId){
            setError("You must specify customerId!")
            return null;
        }
        setError(null)
        getData(String(form.customerId), form.eventType, undefined)
            .then((page: IPage<IEventByCustomer> | null) => {
                if (page) {
                    setPages([page]);
                    setPageCount(page.pageCount);
                }
                console.log(pages);
            })
    };

    useEffect(() => {
        console.log(`CustomerId: ${customerId}`);
        console.log(`EventType: ${form.eventType}`);
        if (customerId) {
            menuContext.setTab(0);
            getData(customerId, searchParams.get("eventType"), undefined).then(
                (data: IPage<IEventByCustomer> | null) => {
                    if (data) {
                        setPages([data]);
                        setPageCount(data.pageCount);
                    }
                    setForm((prev: any) => ({
                        ...prev,
                        customerId: customerId,
                        eventType: searchParams.get("eventType")
                    }));
                }
            );
        }
    }, []);

    const handlePrev = () => {
        setPages((prev) => [...prev.slice(0, -1)]);
    };

    const handleNext = async () => {
        getData(
            String(form.customerId),
            form.eventType,
            pages[pages.length - 1].pagingState
        ).then((data: IPage<IEventByCustomer> | null) => {
            if (data) {
                setPages((prev) => [...prev, data]);
            }
        });
    };

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap="30px">
                <ErrorAlert error={error}></ErrorAlert>
                <Box id="filter" display="flex" gap="20px">
                    <StyledTextField
                        name="customerId"
                        id="customer-id"
                        label="customerId"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                        value={customerId}
                    />
                    <StyledTextField
                        name="accountId"
                        id="account-id"
                        label="accountId"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                    />
                    <StyledTextField
                        name="eventType"
                        id="eventType"
                        label="eventType"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                        value={searchParams.get("eventType")}
                    />
                    <StyledTextField
                        name="actor"
                        id="actor"
                        label="actor"
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
                <EventByCustomerTable
                    pages={pages}
                    pageNumber={pages.length}
                    pageCount={pageCount}
                    onNext={handleNext}
                    onPrev={handlePrev}
                ></EventByCustomerTable>
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

export default CustomerPage;
