import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authThunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, error, isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            window.location.replace("/dashboard");
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Login Successful!", { autoClose: 2000 });
            const timer = setTimeout(() => navigate('/dashboard'), 2000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e8f0fe',
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    boxShadow: 4,
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: 900,
                    overflow: 'hidden',
                }}
            >
                {/* Image Section */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', sm: 400 },
                        p: 3,
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src="/images/kits.png"
                        alt="Login Visual"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '300px',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                {/* Form Section */}
                <Box
                    sx={{
                        width: '80%',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        textAlign="center"
                        color="primary"
                        fontWeight={600}
                        mb={2}
                    >
                        Welcome Back
                    </Typography>

                    {isError && (
                        <Typography color="error" textAlign="center" mb={2}>
                            {error}
                        </Typography>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            maxWidth: 350, // restrict input/form width
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <ToastContainer position="top-center" />
        </Box>
    );
};

export default Login;
