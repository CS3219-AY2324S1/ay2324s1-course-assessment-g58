import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ASSERTION_ERROR_PATTERN = /AssertionError: Test (\d+): Expected .+, but got .+/g;

interface FailedTestCasesAccordionsProps {
  stderr: string | null;
}

const FailedTestCasesAccordions = ({ stderr }: FailedTestCasesAccordionsProps) => {
  // Extract all assertion errors using the regular expression
  var errors: RegExpMatchArray[] = [];
  if (stderr) {
    errors = Array.from(stderr.matchAll(ASSERTION_ERROR_PATTERN));
  }

  return (
    <div>
      {stderr && errors.map((error, index) => (
        <Accordion key={index} style={{ backgroundColor: 'red' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel${index}-header`}>
            <Typography>Failed Test {error[1]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{error[0]}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {stderr === null && (
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Expecting errors but none found, driver code has issues
        </Typography>
      )}
    </div>
  );
};

export default FailedTestCasesAccordions;
