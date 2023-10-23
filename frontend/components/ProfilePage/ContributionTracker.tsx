import { Box, List, ListItem } from "@mui/material";

/* Referenced from https://bitsofco.de/github-contribution-graph-css-grid/ */
const ContributionTracker = () => {
    return (
        <Box className="graph">
            <List className="months">
                <ListItem>Jan</ListItem>
                <ListItem>Feb</ListItem>
                <ListItem>Mar</ListItem>
                <ListItem>Apr</ListItem>
                <ListItem>May</ListItem>
                <ListItem>Jun</ListItem>
                <ListItem>Jul</ListItem>
                <ListItem>Aug</ListItem>
                <ListItem>Sep</ListItem>
                <ListItem>Oct</ListItem>
                <ListItem>Nov</ListItem>
                <ListItem>Dec</ListItem>
            </List>
            <List className="days relative top-[-7px]">
                <ListItem>Sun</ListItem>
                <ListItem>Mon</ListItem>
                <ListItem>Tue</ListItem>
                <ListItem>Wed</ListItem>
                <ListItem>Thu</ListItem>
                <ListItem>Fri</ListItem>
                <ListItem>Sat</ListItem>
            </List>
            <List className="squares w-[625px]"></List>
        </Box>
    );
};

export default ContributionTracker;
