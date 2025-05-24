import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Box,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const RecentQuiz = ({ tests }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mt: 5,width:'100%', backgroundColor:"#f0f4f8" }}>
      <Typography variant="h6" gutterBottom>
        Recent Quizzes
      </Typography>
      <List>
        {tests?.data?.length > 0 ? (
          tests.data.map((quiz, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{ paddingY: 2, display: 'flex', width: '100%' }}
              >
                {/* Left side: Quiz details */}
                <Box sx={{ width: '50%', pr: 2, textAlign: 'left' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(quiz.created_at).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {quiz.duration} minutes
                  </Typography>
                </Box>

                {/* Right side: Button centered */}
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{ 
    paddingX: 3,   // horizontal padding
    paddingY: 1.5, // vertical padding
    fontSize: '1.1rem'  // increase font size
  }}
                    onClick={() => navigate(`/dashboard/test/${quiz.testcode}`)}
                  >
                    See Students
                  </Button>
                </Box>
              </ListItem>
              {index < tests.data.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No quizzes found.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default RecentQuiz;
