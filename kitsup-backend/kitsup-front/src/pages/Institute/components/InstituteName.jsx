import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InstituteAdminPage = ({user}) => {
  const navigate = useNavigate();

  const instituteData = {
    instituteName: user.profile.institute_name,
    type: user.profile.type,
    city: user.profile.city,
    state: user.profile.state,
  };
 

  const handleTestButton = () => {
    navigate('/createtest')
  };

  const handleAddTeacher = () => {
     navigate("/addteacher")
  };

  return (
    <Paper elevation={3} sx={{ px: 4, py: 3, borderRadius: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: 'primary.main' }}
      >
        {user.profile.institute_name.toUpperCase()}
      </Typography>

      {/* Institute Info */}
      <Grid container spacing={2} justifyContent="center" mt={1}>
        {Object.entries(instituteData).map(([key, value], index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Buttons */}
      <Grid container spacing={2} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTestButton}
            sx={{ py: 1, fontWeight: 600 }}
          >
            Create Test
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleAddTeacher}
            sx={{ py: 1, fontWeight: 600 }}
          >
            Add Teacher
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InstituteAdminPage;
