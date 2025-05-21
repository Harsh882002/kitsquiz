import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Grid,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, resetResult } from '../features/auth/authThunks';

const StudentResultPage = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [showLoadingMessage, setShowLoadingMessage] = useState(true); // 3-second wait
    const [showResult, setShowResult] = useState(false);

    const { currentTest: resultData, isLoading, error } = useSelector(state => state.auth);

    // Load user and token
    useEffect(() => {
        dispatch(resetResult());
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUserData(JSON.parse(storedUser));
            setAuthToken(storedToken);
        }
    }, [dispatch]);

    // Fetch result and wait 3 seconds before showing
    useEffect(() => {
        if (userData?.id && authToken) {
            dispatch(getResult({ testCode: userData.id, token: authToken }));

            setShowLoadingMessage(true);
            const timer = setTimeout(() => {
                setShowLoadingMessage(false);
                setShowResult(true);
            }, 3000);

            return () => clearTimeout(timer); // cleanup
        }
    }, [userData, authToken, dispatch]);

    // Show loading screen
    if (!userData || !authToken || isLoading || !resultData || showLoadingMessage) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
                <CircularProgress />
                <Typography variant="h3" mt={2} fontWeight="bold" color="primary">
                    Test submitting... Waiting for result
                </Typography>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Typography color="error" textAlign="center" mt={5}>
                {error}
            </Typography>
        );
    }

    // Calculate score
    const score = resultData?.student?.score || 0;
    const totalQuestions = resultData?.test?.questions || 1;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    return (
        <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f0faff' }}>
            <Paper elevation={6} sx={{
                maxWidth: 700,
                mx: 'auto',
                p: 5,
                borderRadius: 4,
                textAlign: 'center',
                backgroundImage: 'linear-gradient(to right, #e0ffe8, #cde7ff)',
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)'
            }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                    Congratulations!
                </Typography>

                <Typography variant="h6" gutterBottom>
                    {resultData.result?.name || "Student"}, you completed the test.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Test ID</Typography>
                        <Typography variant="body1" fontWeight="bold">{resultData.student?.test_id}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Total Questions</Typography>
                        <Typography variant="body1" fontWeight="bold">{totalQuestions}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Your Score</Typography>
                        <Typography variant="body1" fontWeight="bold" color="green">{score}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Percentage</Typography>
                        <Typography variant="body1" fontWeight="bold" color="blue">{percentage}%</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* <Typography variant="body1" color="text.secondary" mb={2}>
                    {resultData.remarks || "No remarks provided."}
                </Typography> */}

                <Typography variant="h4" color="secondary" mt={2} fontWeight="bold">
                    You can leave this page.
                </Typography>
                <Typography variant="h6" color="secondary" mt={2} fontWeight="bold">
                    Thank you!              
                      </Typography>

            </Paper>
        </Box>
    );
};

export default StudentResultPage;
