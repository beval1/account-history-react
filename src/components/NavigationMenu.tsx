import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NavigationMenuContext } from "../App";

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
    // const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const menuContext = useContext(NavigationMenuContext);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        menuContext.setTab(newValue);
        // console.log(newValue)
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
                    value={menuContext.tab}
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
