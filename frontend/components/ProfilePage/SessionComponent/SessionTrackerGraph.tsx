import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    AreaChart,
    ResponsiveContainer,
} from "recharts";

type graphDataPoint = {
    date: string;
    sessions: number;
};

type graphDataArray = graphDataPoint[];

interface graphProps {
    height: number | string;
    width: number | string;
    graphData: graphDataArray;
}

function SessionTrackerGraph(props: graphProps) {
    const { height, width, graphData } = props;
    return (
        <>
            <ResponsiveContainer height={height} width={width}>
                <AreaChart
                    data={graphData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorAmt"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#82ca9d"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#82ca9d"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        contentStyle={{
                            color: "black",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorAmt)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default SessionTrackerGraph;
