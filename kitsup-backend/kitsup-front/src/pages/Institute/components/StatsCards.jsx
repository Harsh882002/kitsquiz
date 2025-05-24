import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const stats = [
  { label: 'Total Quizzes Taken', value:0 },
  { label: 'Student Count', value: 0 },
  { label: 'Available Quizzes', value: 0 },
];

const StatsCards = () => {
  return (
    <Grid container spacing={3} mb={4}>
      {stats.map((stat, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card elevation={4} sx={{ borderRadius: 3, backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                {stat.label}
              </Typography>
              <Typography variant="h3" align="center" sx={{ fontWeight: 'bold' }}>
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
