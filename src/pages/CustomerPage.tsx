import {
    Box,
    Divider,
} from "@mui/material";
import React, { useState } from "react";
import CustomRangePicker from "../components/CustomRangePicker";
import SearchButton from "../components/SearchButton";
import StyledTextField from "../components/StyledTextField";
import { IEventByCustomer } from "../api/models/IEventByCustomer";
import { getEventsByCustomer } from "../api/ApiClient";
import { handleInputChange } from "../utility";
import EventByCustomerTable from "../components/EventByCustomerTable";

type Props = {};

type formProps = {
    customerId: number;
    accountId: number;
    actor: string;
    eventType: string;
    startDate: Date;
    endDate: Date;
};

function CustomerPage(props: Props) {
    const [form, setForm] = useState<formProps>({} as formProps);
    const [rows, setRows] = useState<IEventByCustomer[]>([]);

    const handleSearch = async () => {
        const events: IEventByCustomer[] = await getEventsByCustomer(
            form.customerId,
            form.accountId,
            form.actor,
            form.eventType,
            form.startDate,
            form.endDate
        );
        console.log(events)
        setRows(events);
    };

    return (
        <Box display="flex" flexDirection="column" gap="30px">
            <Box id="filter" display="flex" gap="20px">
                <StyledTextField
                    name="customerId"
                    id="customer-id"
                    label="customerId"
                    variant="filled"
                    onChange={(e) => handleInputChange(e, setForm)}
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
                {/* <CustomRangePicker /> */}
                <CustomRangePicker></CustomRangePicker>
                <SearchButton onClick={handleSearch} />
            </Box>
            <Divider variant="middle" />
            <EventByCustomerTable rows={rows}></EventByCustomerTable>
        </Box>
    );
}

export default CustomerPage;
