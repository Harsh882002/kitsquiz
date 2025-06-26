import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTestsOfInstitute } from '../../../features/auth/authThunks';

const StatsCards = () => {
  const dispatch = useDispatch();
  const { tests = [], isLoading, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const institute = JSON.parse(localStorage.getItem('user'));
  const institute_id = institute?.profile?.id;

  useEffect(() => {
    if (institute_id && token) {
      dispatch(getAllTestsOfInstitute({ institute_id, token }));
    }
  }, [dispatch, institute_id, token]);

  const quizCount = tests?.length || 0;

  const stats = [
    { label: 'Total Quizzes Taken', value: quizCount },
    ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} mb={4}>
      {stats.map((stat, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card
            elevation={4}
            sx={{ borderRadius: 3, backgroundColor: 'black', color: 'white' }}
          >
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                {stat.label}
              </Typography>
              <Typography
                variant="h3"
                align="center"
                sx={{ fontWeight: 'bold' }}
              >
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
