import React from 'react';
import { Container, Box, Divider, Typography, Grid, Paper, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import StatsCards from './components/StatsCards';
import InsituteQuizzes from './components/Quizzes';
import InstituteAdminPage from './components/InstituteName';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authThunks';

const InstitutePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("userva",user)
  const handleLogout = async () => {
    try {
      // Dispatch logout action
      await dispatch(logoutUser());

      // Show success toast with onClose to navigate after the toast is closed
    toast.success("Logout successful!", {
  autoClose: 2000,
  onClose: () => {
    setTimeout(() => {
      console.log("Navigating to the login page...");
      navigate("/"); // Navigate to login after 2 seconds
    }, 2000);
  },
});

    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4} position="relative">
        {/* Logout Button */}
        <Box position="absolute" top={16} right={16}>
          <IconButton onClick={handleLogout} color="error">
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* Admin Info */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mt: 6 }}>
          <InstituteAdminPage user={user}  />
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* Stats & Quizzes */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box width={{ xs: '60%', sm: '90%', md: '70%' }}>
            <StatsCards />
          </Box>
          <Box width={{ xs: '60%', sm: '90%', md: '70%' }}>
            <InsituteQuizzes />
          </Box>
        </Box>
      </Box>

      <ToastContainer />
    </Container>
  );
};

export default InstitutePage;
