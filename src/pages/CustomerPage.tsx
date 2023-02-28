import { Box, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomRangePicker from "../components/CustomRangePicker";
import SearchButton from "../components/SearchButton";
import StyledTextField from "../components/StyledTextField";
import { IEventByCustomer } from "../api/models/IEventByCustomer";
import { getEventsByCustomer, ParametersByCustomer } from "../api/ApiClient";
import { handleInputChange } from "../utility";
import EventByCustomerTable from "../components/EventByCustomerTable";
import { IPage } from "../api/models/IPage";
import { useParams } from "react-router-dom";

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
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [customerFocused, setCustomerFocused] = useState<boolean>(false);
    let { customerId } = useParams();

    const handleSearch = async () => {
        setLoading(true);
        const startDateStr = startDate?.toISOString().split("T")[0];
        const endDateStr = endDate?.toISOString().split("T")[0];
        let params: ParametersByCustomer = {
            accountId: form.accountId,
            actor: form.actor,
            eventType: form.eventType,
            startDate: startDateStr,
            endDate: endDateStr,
            pagingState: pages[pages.length-1]?.pagingState
        };

        const page: IPage<IEventByCustomer> = await getEventsByCustomer(
            form.customerId,
            params
        );
        setPages((prev) => [...prev, page]);
        console.log(pages)
        setLoading(false);
    };

    useEffect(() => {
        console.log(`CustomerId: ${customerId}`);
        if (customerId) {
            getEventsByCustomer(String(customerId), null).then((data: IPage<IEventByCustomer>) => {
                setPages((prev) => [...prev, data]);
                setForm((prev: any) => ({
                    ...prev,
                    customerId: customerId,
                }));
                setCustomerFocused(true)
            });
        }
    }, []);

    const handlePrev = () => {
        setPages((prev) => [...prev.slice(0, -1)])
    }

    const handleNext = () => {
        handleSearch();
    }

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap="30px">
                <Box id="filter" display="flex" gap="20px">
                    <StyledTextField
                        name="customerId"
                        id="customer-id"
                        label="customerId"
                        variant="filled"
                        onChange={(e) => handleInputChange(e, setForm)}
                        // inputRef={customerRef}
                        // focused={customerFocused}
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
                <EventByCustomerTable pages={pages} pageNumber={pages.length} onNext={handleNext} onPrev={handlePrev}></EventByCustomerTable>
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
