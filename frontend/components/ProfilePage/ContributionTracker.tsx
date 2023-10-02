/* Referenced from https://bitsofco.de/github-contribution-graph-css-grid/ */
const ContributionTracker = () => {
    return (
        <div className="graph">
            <ul className="months">
                <li>Jan</li>
                <li>Feb</li>
                <li>Mar</li>
                <li>Apr</li>
                <li>May</li>
                <li>Jun</li>
                <li>Jul</li>
                <li>Aug</li>
                <li>Sep</li>
                <li>Oct</li>
                <li>Nov</li>
                <li>Dec</li>
            </ul>
            <ul className="days relative top-[-7px]">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul className="squares w-[625px]">
            </ul>
        </div>
    );
};

export default ContributionTracker;