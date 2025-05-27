import { Box, Button, Typography } from "@mui/material";
import DashboardStats from "./component/DashBoardStatus";
import RecentQuizzes from "./component/Quizzes";
import Sidebar from "./component/Sidebar";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/ExitToApp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getCount, getTestData, logoutUser, resetLogoutState } from "../../features/auth/authThunks";
import "react-toastify/dist/ReactToastify.css";

const SuperAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { count: resultCount, test: testData, isLoading, error, isLogoutSuccess } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCount({ token }));
      dispatch(getTestData({ token }));
    }
  }, [token, dispatch]);

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

  const handleRedirectToInstitute = () => {
    navigate("/addinstitute");
  };

  const handleRedirectToTeacher = () => {
    navigate("/addteacher");
  };

  if (!user || !user.profile) {
    return <Typography textAlign="center" mt={5}>User not found</Typography>;
  }

  if (isLoading) return <Typography textAlign="center" mt={5}>Loading...</Typography>;
  if (error) return <Typography color="error" textAlign="center" mt={5}>{error}</Typography>;
  if (!resultCount) return <Typography textAlign="center" mt={5}>Loading stats...</Typography>;

  return (
    <>
      <Sidebar />

      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          px: { xs: 2, sm: 6 },
          mt: { xs: 3, sm: 6 },
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
            fontSize: { xs: '1.3rem', sm: '2rem' },
            flex: 1,
            letterSpacing: 1,
          }}
        >
          👋 Welcome, {user.profile.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            width: '100%',
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddBoxIcon />}
            onClick={handleRedirectToInstitute}
            sx={{
              borderRadius: 2,
              px: 2,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
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
              borderRadius: 2,
              px: 2,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
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
              borderRadius: 2,
              px: 2,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ mt: 3, px: { xs: 2, sm: 6 }, py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <DashboardStats resultCount={resultCount} />
        </Box>
        <Box sx={{ mb: 4 }}>
          <RecentQuizzes testData={testData} />
        </Box>
      </Box>

      <ToastContainer />
    </>
  );
};

export default SuperAdmin;
