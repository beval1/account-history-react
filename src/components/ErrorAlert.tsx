import { Alert, AlertTitle, Box, Paper, Stack } from "@mui/material";
import React from "react";

type Props = {
    error: string | null;
};

function ErrorAlert(props: Props) {
    return (
        <Box display={props.error ? "block" : "none"}>
            <Paper elevation={1}>
                <Stack sx={{ width: "100" }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{props.error}</strong>
                    </Alert>
                </Stack>
            </Paper>
        </Box>
    );
}

export default ErrorAlert;
