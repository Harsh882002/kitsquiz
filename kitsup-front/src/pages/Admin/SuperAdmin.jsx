import { Box, Button, Typography } from "@mui/material";
import DashboardStats from "./component/DashBoardStatus";
import RecentQuizzes from "./component/Quizzes";
import Sidebar from "./component/Sidebar";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/ExitToApp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { logoutApi } from "../../features/auth/authAPI";
import { toast, ToastContainer } from "react-toastify";
import { getCount, getTestData, logoutUser } from "../../features/auth/authThunks";
import { useEffect } from "react";
import { useState } from "react";


const SuperAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  if (!user || !user.profile) {
    return <Typography textAlign="center" mt={5}>User not found</Typography>;
  }


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { count: resultCount, test: testData, isLoading, error, isLogoutSuccess } = useSelector(state => state.auth);

  console.log(testData)

  useEffect(() => {
    if (token) {
      dispatch(getCount({ token }));
      dispatch(getTestData({ token }))
    }
  }, [token, dispatch]);

  const handleRedirectToInstitute = () => {
    navigate("/addinstitute");
  };

  const handleRedirectToTeacher = () => {
    navigate("/addteacher"); // Change route to the correct path
  };

// Handle logout success
  useEffect(() => {
    if (isLogoutSuccess) {
      toast.success("Logout Successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          navigate("/");
          dispatch(resetLogoutState());
        }
      });
    }
  }, [isLogoutSuccess, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!resultCount) return <Typography textAlign="center" mt={5}>Loading stats...</Typography>;


  if (isLoading) return <Typography textAlign="center" mt={5}>Loading...</Typography>;
  if (error) return <Typography color="error" textAlign="center" mt={5}>{error}</Typography>;

  return (
    <>
      <Sidebar />

      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 6 },
          mt: { xs: 4, sm: 6 },
          gap: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            fontSize: { xs: '1.6rem', sm: '2rem' },
            flex: 1,
            letterSpacing: 1.5,
          }}
        >
          👋 Welcome, {user.profile.name}
        </Typography>

        {/* Button Group */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexShrink: 0,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: { xs: 2, sm: 0 },
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddBoxIcon />}
            onClick={handleRedirectToInstitute}
            sx={{
              borderRadius: 3,
              padding: '8px 20px',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            Add Institute
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
            onClick={handleRedirectToTeacher}
            sx={{
              borderRadius: 3,
              padding: '8px 20px',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Add Teacher
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              padding: '8px 20px',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ mt: 3, paddingX: { xs: 2, sm: 6 }, paddingY: 3 }}>
        <Box sx={{ mb: 4 }}> {/* Added margin-bottom to give spacing between sections */}
          <DashboardStats resultCount={resultCount} />
        </Box>
        <Box sx={{ mb: 4 }}> {/* Added margin-bottom to give spacing between sections */}
          <RecentQuizzes testData={testData} />
        </Box>

      </Box>
      <ToastContainer />

    </>
  );
};

export default SuperAdmin;
