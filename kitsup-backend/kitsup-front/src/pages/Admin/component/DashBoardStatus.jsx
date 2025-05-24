import React from 'react';
import { Grid, Paper, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import QuizIcon from '@mui/icons-material/Quiz';

const stats = {
  institutes: 5,
  teachers: 32,
  students: 350,
  quizzes: 12,
};

const StatCard = ({ icon, label, value }) => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 3, sm: 4 },
      backgroundColor: '#1e1e2f',
      color: '#fff',
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      height: '100%',
      justifyContent: 'space-between',
      boxSizing: 'border-box', // To make sure padding doesn't mess up layout
    }}
  >
    <Box sx={{ fontSize: { xs: 35, sm: 45 } }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Paper>
);

const DashboardStats = ({resultCount}) => {
  console.log(resultCount)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 8, sm: 6 }, mt: { xs: 5, sm: 6 } }}>
      <Grid container spacing={isSmallScreen ? 2 : 3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<AccountBalanceIcon fontSize="inherit" />} label="Institutes" value={resultCount.data.institutes} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<PeopleIcon fontSize="inherit" />} label="Teachers" value={resultCount.data.teachers} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<GroupsIcon fontSize="inherit" />} label="Students" value={resultCount.data.students} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={<QuizIcon fontSize="inherit" />} label="Quizzes" value={resultCount.data.quizzes} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStats;
