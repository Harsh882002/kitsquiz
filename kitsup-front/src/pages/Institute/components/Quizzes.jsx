import React from 'react';
import { Typography, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const recentQuizzes = [
  { teacher: 'John Doe', title: 'Math Quiz', score: '85%' },
  { teacher: 'Jane Smith', title: 'Biology Quiz', score: '92%' },
  { teacher: 'Amit Kumar', title: 'Physics Test', score: '78%' },
];

const InsituteQuizzes = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Recent Quizzes Taken
      </Typography>
      <Grid container spacing={3}>
        {recentQuizzes.map((quiz, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By {quiz.teacher}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1">
                  Score: <strong>{quiz.score}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default  InsituteQuizzes;
