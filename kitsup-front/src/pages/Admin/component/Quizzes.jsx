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
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecentQuizzes = ({ testData = {} }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const quizzesPerPage = 5;
const quizzes = (testData?.data || []).slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
        mt: { xs: 10, sm: 12 },
        px: 2,
        ml: { sm: '200px' },
        width: { xs: '100%', sm: 'calc(100% - 260px)' },
        maxWidth: '1000px',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        📋 Recent Quizzes
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : '#f9f9f9',
          overflow: 'hidden',
        }}
      >
        <List>
          {isArray && currentQuizzes.length > 0 ? (
            currentQuizzes.map((quiz, index) => (
              <React.Fragment key={quiz.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/dashboard/test/${quiz.testcode}`)}
                      aria-label={`See students of ${quiz.title}`}
                    >
                      See Students
                    </Button>
                  }
                >
                  <ListItemText
                    primary={quiz.title || 'No Title'}
                    secondary={
                      `📅 ${new Date(quiz.created_at).toLocaleDateString()} | ❓ ${quiz.questions} Questions`
                    }
                    primaryTypographyProps={{
                      fontWeight: 'bold',
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
                {index < currentQuizzes.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: 'center' }}
            >
              No quizzes available.
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
            siblingCount={0}
            size="small"
            aria-label="Quiz pagination"
          />
        </Box>
      )}
    </Box>
  );
};

export default RecentQuizzes;
