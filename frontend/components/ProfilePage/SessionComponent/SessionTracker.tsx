import { fetchGet } from "@/utils/apiHelpers";
import { useEffect, useState } from "react";
import SessionTrackerGraph from "./SessionTrackerGraph";
import { Typography } from "@mui/material";

type sessionData = {
    year: number;
    month: number;
    _count: { _all: number };
};

type sessionDataArray = sessionData[];

interface trackerProps {
    username: string | null;
}

type graphDataPoint = {
    date: string;
    sessions: number;
};

type graphDataArray = graphDataPoint[];

interface datePresentMap {
    [key: string]: number;
}

function SessionTracker(props: trackerProps) {
    const [graphData, setGraphData] = useState<graphDataArray>([]);
    const { username } = props;

    useEffect(() => {
        if (!username) return;

        const processData = (data: sessionDataArray) => {
            const res: graphDataArray = [];

            const currDate = new Date();
            const oneYearAgo = new Date().setFullYear(
                currDate.getFullYear() - 1
            );

            const presentMonths: datePresentMap = {};

            // create hash table containing dates without sessions
            for (
                let date = new Date(oneYearAgo);
                date <= currDate;
                date.setMonth(date.getMonth() + 1)
            ) {
                // increment month by one as it is a range from 0 (January) to 11 (December)
                const key: string = `${date.getFullYear().toString()}-${(
                    date.getMonth() + 1
                ).toString()}`;

                // assign to hash table
                presentMonths[key] = 0;
            }

            // add number of sessions
            if (data) {
            data.forEach((obj) => {
                // increment month by one as it is a range from 0 (January) to 11 (December)
                const year_month = `${obj.year}-${obj.month + 1}`;
                const count = obj._count._all;

                // transfer number of sessions
                presentMonths[year_month] = count;
            });
            }
            // push values in hash map to array
            for (
                let date = new Date(oneYearAgo);
                date <= currDate;
                date.setMonth(date.getMonth() + 1)
            ) {
                const key = `${date.getFullYear().toString()}-${(
                    date.getMonth() + 1
                ).toString()}`;

                res.push({ date: key, sessions: presentMonths[key] });
            }

            return res;
        };

        const fetchData = async () => {
            const rawData = await fetchGet(`/api/session-count/${username}`);
            const processedData = processData(rawData.data);

            setGraphData(processedData);
        };

        fetchData();
    }, []);

    return (
        <>
            <Typography>Sessions</Typography>
            <SessionTrackerGraph
                width="100%"
                height={200}
                graphData={graphData}
            />
        </>
    );
}

export default SessionTracker;
