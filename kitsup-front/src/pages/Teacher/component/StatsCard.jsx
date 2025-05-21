// src/components/StatsCard.jsx

import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleIcon from '@mui/icons-material/People';
import { useDispatch, useSelector } from 'react-redux';
import { getTestCount } from '../../../features/auth/authThunks';

const StatCard = ({ label, value, icon }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 2,
    }}
  >
    <Box sx={{ fontSize: 40 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1">{label}</Typography>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
    </Box>
  </Paper>
);

const StatsCard = () => {
  const dispatch = useDispatch();
  const { testCount, isLoading, error } = useSelector((state) => state.auth);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getTestCount({ user_id: userId }));
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Total Quizzes" value={testCount} icon={<QuizIcon />} />
      </Grid>

      
    </Grid>
  );
};

export default StatsCard;
