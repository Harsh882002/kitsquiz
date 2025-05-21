import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddTeacherButton = () => {
  // const navigate = useNavigate();

  // const handleRedirect = () => {
  //   navigate('/addteacher');
  // };

  return (
    <Box display="flex" justifyContent="center" mb={4}>
      <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />}>
        Add Teacher
      </Button>
    </Box>
  );
};

export default AddTeacherButton;
