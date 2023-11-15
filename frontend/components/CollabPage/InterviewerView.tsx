// Source: https://mui.com/material-ui/react-tabs/
import React, { useState } from 'react';
import { 
  Paper,
  Typography,
  Button,
  TextareaAutosize,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import ChatUI from './ChatBot/ChatUI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// TODO: add this in after submissions are implemented
// interface InterviewerViewProps {
//   submissions?: submissions[];
// }

const InterviewerView = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={3} style={{ position: 'fixed', bottom: 190, right: 0, width: '300px', height: '70%', overflowY: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Interview view tabs">
          <Tab label="Notes" {...a11yProps(0)} />
          <Tab label="Help Bot" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TextareaAutosize
          minRows={10}
          className="code-input"
          style={{ width: '100%' }} // Stretch horizontally
          placeholder="Write your notes here..."
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChatUI/>
      </CustomTabPanel>
    </Paper>
    
  );
}

export default InterviewerView;