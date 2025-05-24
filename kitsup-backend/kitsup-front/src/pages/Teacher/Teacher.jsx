import React, { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import TeacherProfile from './component/TeacherProfile';
import StatsCard from './component/StatsCard';
import RecentQuiz from './component/RecentQuiz';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getTeacherTests, logoutUser } from '../../features/auth/authThunks';

const Teacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { test: tests, isLoading, error } = useSelector(state => state.auth);
  console.log("data ", tests);

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.id;

  useEffect(() => {
    const fetchTests = async () => {
      try {
        await dispatch(getTeacherTests({ user_id })).unwrap();
      } catch (error) {
        console.error("Error fetching teacher tests:", error);
        
      }
    };

    if (user_id) fetchTests();
  }, [dispatch, user_id]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logout successful!", {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const handleRedirect = () => {
    navigate("/createtest");
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, ml: { md: '50px' } }}>
      {/* Top Bar: Responsive */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        mb={3}
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold">Teacher Dashboard</Typography>

        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} width={{ xs: '100%', sm: 'auto' }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleRedirect}>
            Create Test
          </Button>
          <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box mb={4}>
        <TeacherProfile />
      </Box>

      {/* Stats Section */}
      <Box mb={4}>
        <StatsCard />
      </Box>

      {/* Recent Quizzes or Loader */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        {isLoading ? (
          <CircularProgress size={50} color="primary" />
        ) : (
          <RecentQuiz tests={tests} />
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Teacher;
