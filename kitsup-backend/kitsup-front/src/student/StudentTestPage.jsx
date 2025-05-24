import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert,
  LinearProgress,
  Paper,
  Container,
  Snackbar
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTestByCode } from '../features/auth/authThunks';
import { resultApi } from '../features/auth/authAPI';

const TestPage = () => {
  const { testCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentTest, loading, error } = useSelector((state) => state.auth);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isExpired, setIsExpired] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // NEW: prevent multiple submissions

  const token = localStorage.getItem('token');

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const showWarning = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
      navigate("/");
      return;
    }

    if (testCode && token) {
      dispatch(getTestByCode({ testCode, token }));
    }
  }, [testCode, token, dispatch, navigate]);

  useEffect(() => {
    if (currentTest) {
      const now = new Date();
      const expiryDate = new Date(currentTest.expire_at);
      setIsExpired(now > expiryDate);
      setTimeLeft(currentTest.duration * 60);
      requestFullScreen();

      const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
          setWarnings((w) => {
            const newWarnings = w + 1;
            showWarning(`Warning ${newWarnings}: Don't exit fullscreen mode!`);
            if (newWarnings >= 3) handleSubmit();
            return newWarnings;
          });
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          setWarnings((w) => {
            const newWarnings = w + 1;
            showWarning(`Warning ${newWarnings}: Don't switch tabs!`);
            if (newWarnings >= 3) handleSubmit();
            return newWarnings;
          });
        }
      };

      document.addEventListener('fullscreenchange', handleFullScreenChange);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('fullscreenchange', handleFullScreenChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [currentTest]);

  useEffect(() => {
    if (isExpired || loading || !currentTest) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired, loading, currentTest]);

  const handleAutoSubmit = async () => {
    console.log("Time expired! Auto-submitting...");
    await handleSubmit();
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentQuestionIndex((prev) => Math.min(prev + 1, currentTest.questions.length - 1));
    } else {
      setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleSubmit = async () => {
    if (!currentTest || hasSubmitted) return;

    setHasSubmitted(true); // prevent multiple submissions

    const score = currentTest.questions.reduce((acc, question) => {
      const correct = question.correct_answer;
      const selected = selectedOptions[question.id];
      return correct === selected ? acc + 1 : acc;
    }, 0);

    try {
      const res = await resultApi(testCode, selectedOptions, score, token);
 
      navigate(`/test/${testCode}/results`, {
        state: {
          score,
          totalQuestions: currentTest.questions.length,
          answers: selectedOptions,
          questions: currentTest.questions
        }
      });
    } catch (err) {
      console.error("Error while submitting result:", err);
      showWarning("Failed to submit test result.");
      setHasSubmitted(false); // allow retry if error occurred
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  if (!currentTest) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Test not found</Alert>
      </Container>
    );
  }

  if (isExpired) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          This quiz expired on {new Date(currentTest.expire_at).toLocaleString()}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </Container>
    );
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentTest.questions.length - 1;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{currentTest.title}</Typography>
          <Typography variant="h6" color="primary">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Valid until: {new Date(currentTest.expire_at).toLocaleString()}
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, mt: 2 }} />
        <Typography variant="caption" display="block" textAlign="right" mt={1}>
          Question {currentQuestionIndex + 1} of {currentTest.questions.length}
        </Typography>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.question_text}
          </Typography>
          <RadioGroup
            value={selectedOptions[currentQuestion.id] || ''}
            onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
          >
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={`${key.toUpperCase()}. ${value}`}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => handleNavigation('prev')}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color={isLastQuestion ? 'success' : 'primary'}
          onClick={isLastQuestion ? handleSubmit : () => handleNavigation('next')}
          disabled={!selectedOptions[currentQuestion.id] || hasSubmitted}
        >
          {isLastQuestion ? 'Submit Test' : 'Next'}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TestPage;
