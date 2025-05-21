import React from 'react';
import { Paper, Typography, Avatar, Box } from '@mui/material';


const TeacherProfile = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);


  return (
    <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#f0f4f8' }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ width: 64, height: 64 }} src="/teacher-avatar.png" />
        <Box>
          <Typography variant="h6">{user.profile.full_name}</Typography>
          <Typography variant="body2" color="text.secondary">{user.profile.department}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeacherProfile;
