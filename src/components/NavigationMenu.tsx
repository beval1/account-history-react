import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface LinkTabProps {
    label?: string;
    href?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
                event.preventDefault();
                
            }}
            {...props}
        />
    );
}

function NavigationMenu() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    // const location = useLocation();
    // if (location.pathname.includes("/customer")){
    //     setValue(0)
    // }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(newValue)
        switch(newValue){
            case 0: 
                navigate("/customer");
                break;
            case 1:
                navigate("/event");
                break;
            case 2:
                navigate("/actor");
                break;;
        }
    };

    return (
        <Box
            sx={{ width: "100%" }}
            marginBottom="30px"
        
        >
            <Paper sx={{ width: "100%", alignContent: "center", display: "flex", alignItems: "center"}}>
                {/* <Typography component="p" margin="0 20px" fontSize="18px">Filter By</Typography> */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="navigation menu"
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <LinkTab label="Customer" href="/customer" />
                    <LinkTab label="Event" href="/event" />
                    <LinkTab label="Actor" href="/actor" />
                </Tabs>
            </Paper>
        </Box>
    );
}

export default NavigationMenu;
