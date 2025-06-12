import React, { useEffect, useState } from 'react';
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

  const { test, isLoading, error } = useSelector((state) => state.auth);
  const [testsData, setTestsData] = useState({ data: [] });

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.id;

  // Fetch tests on mount
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await dispatch(getTeacherTests({ user_id })).unwrap();
        setTestsData(response); // Set fetched data in local state
      } catch (error) {
        console.error("Error fetching teacher tests:", error);
      }
    };

    if (user_id) fetchTests();
  }, [dispatch, user_id]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logout successful!", { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const handleRedirect = () => {
    navigate("/createtest");
  };

  // 👇 Callback to remove deleted quiz from UI
  const handleDeleteSuccess = (deletedId) => {
    setTestsData((prev) => ({
      ...prev,
      data: prev.data.filter((quiz) => quiz.id !== deletedId),
    }));
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, ml: { md: '50px' } }}>
      {/* Top Bar */}
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

      {/* Profile */}
      <Box mb={4}>
        <TeacherProfile />
      </Box>

      {/* Stats */}
      <Box mb={4}>
        <StatsCard />
      </Box>

      {/* Recent Quizzes */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        {isLoading ? (
          <CircularProgress size={50} color="primary" />
        ) : (
          <RecentQuiz tests={testsData} onDeleteSuccess={handleDeleteSuccess} />
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Teacher;
