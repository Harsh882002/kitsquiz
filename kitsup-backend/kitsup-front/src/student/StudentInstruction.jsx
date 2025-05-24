import React, { use } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InstructionsPage = () => {
    const {testcode} = useParams();
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate(`/test/start/${testcode}`); // Replace with your actual test route
  };

  return (
    <Box sx={{
      background: 'linear-gradient(to right, #e8f5e9, #e0f7fa)',
      minHeight: '100vh',
      p: { xs: 2, md: 6 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper elevation={12} sx={{
        maxWidth: 900,
        width: '100%',
        p: 5,
        borderRadius: 6,
        background: 'white',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
      }}>
        <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
          📘 Test Instructions & Warnings
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="medium" color="success.main" gutterBottom>
          ✅ Instructions for Students
        </Typography>
        <List>
          {[
            "Read all questions carefully before answering.",
            "Each question may have one or more correct answers.",
            "Make sure to answer all questions before submitting.",
            "You can only attempt the test once.",
            "The test is timed; keep an eye on the timer.",
            'Click the "Submit" button once you have completed all questions.',
            "Your answers will be saved automatically as you progress (if supported).",
            "Do not refresh or close the browser during the test."
          ].map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#2e7d32' }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="medium" color="error" gutterBottom>
          ⚠️ Warnings
        </Typography>
        <List>
          {[
            "Do not try to open new tabs, windows, or switch applications during the test. This may lead to automatic submission or disqualification.",
            "Any attempt to cheat or use unfair means will result in cancellation of your test.",
            "Ensure a stable internet connection throughout the test.",
            "If you face any technical issues, contact your teacher or administrator immediately.",
            "Leaving the fullscreen mode (if enabled) may auto-submit your test."
          ].map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <WarningAmberIcon sx={{ color: '#d32f2f' }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={handleStartTest}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 10,
              boxShadow: '0 4px 15px rgba(0, 200, 83, 0.4)',
              textTransform: 'none'
            }}
          >
            Start Test
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstructionsPage;
