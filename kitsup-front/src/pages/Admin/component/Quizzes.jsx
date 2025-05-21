import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Pagination,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecentQuizzes = ({ testData = {} }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const quizzesPerPage = 5;
  const quizzes = testData?.data || [];
  const isArray = Array.isArray(quizzes);

  const indexOfLastQuiz = page * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

   

  return (
    <Box
      sx={{
        mt: 15,
        px: 2,
        ml: { sm: '200px' },
        width: { xs: '100%', sm: 'calc(100% - 260px)' },
        maxWidth: '900px',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Recent Quizzes
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 3, backgroundColor: '#f5f5f5' }}>
        <List>
          {isArray && currentQuizzes.length > 0 ? (
            currentQuizzes.map((quiz, index) => (
              <React.Fragment key={quiz.id}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/dashboard/test/${quiz.testcode}`)}
                    >
                      See Students
                    </Button>
                  }
                >
                  <ListItemText
                    primary={quiz.title || 'No Title'}
                    secondary={`Date: ${new Date(
                      quiz.created_at
                    ).toLocaleDateString()} | Total Questions: ${quiz.questions}`}
                  />
                </ListItem>
                {index < currentQuizzes.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
              No quizzes available
            </Typography>
          )}
        </List>
      </Paper>

      {isArray && quizzes.length > quizzesPerPage && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(quizzes.length / quizzesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default RecentQuizzes;
