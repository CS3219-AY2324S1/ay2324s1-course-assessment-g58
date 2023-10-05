
import { Paper, Typography, Button, TextareaAutosize } from '@mui/material';

// TODO: add this in after submissions are implemented
// interface InterviewerViewProps {
//   submissions?: submissions[];
// }

const InterviewerView = () => {
  return (
    <Paper elevation={3} style={{ position: 'fixed', bottom: 190, right: 0, width: '300px', height: '70%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <Typography variant="h6">Example Submissions</Typography>
      </div>
      {/* Add your interviewer view content here replace Textarea below with this
          submissions?.map((submission) => (
                    <div key={submission._id}>
                        <p>{submissions.description}</p>
                    </div>
                ))*/}
      <TextareaAutosize
                    minRows={10}
                    className="code-input"
                    style={{ width: '100%' }} // Stretch horizontally
                    placeholder="Contents"
                    />
    </Paper>
  );
}

export default InterviewerView;
