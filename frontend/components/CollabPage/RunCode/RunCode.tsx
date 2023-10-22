import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import CompilerServiceResult from '@/types/CompilerServiceResult';

interface RunCodeProps {
    runResults: CompilerServiceResult;
}

type StatusDescriptions = {
    [key: number]: string;
};

const statusDescriptions: StatusDescriptions = {
    1: "In Queue",
    2: "Processing",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error",
  };
  
  const getStatusMessage = (statusId: number) => {
    return statusDescriptions[statusId] || "No errors";
  };

function RunCode({ runResults }: RunCodeProps) {
    const { data, error, message, firstFailedTestCaseNumber } = runResults;
    console.log(runResults);
    return (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Code Execution Result
            </Typography>
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Status: {getStatusMessage(data.status_id)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Time: {data.time} seconds
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Memory: {data.memory} KB
            </Typography>
            {data.stdout && (
              <>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                  Stdout:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="pre" gutterBottom>
                  {data.stdout}
                </Typography>
              </>
            )}
            {data.stderr && (
              <>
                <Typography variant="body2" color="error" component="p" gutterBottom>
                  Error:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="pre" gutterBottom>
                  {data.stderr}
                </Typography>
              </>
            )}
            {error && (
              <Typography variant="body2" color="error" component="p" gutterBottom>
                {message}
              </Typography>
            )}
            {firstFailedTestCaseNumber && (
              <Typography variant="body2" color="error" component="p" gutterBottom>
                First Failed Test Case: {firstFailedTestCaseNumber}
              </Typography>
            )}
          </CardContent>
        </Card>
      );
};

export default RunCode;
