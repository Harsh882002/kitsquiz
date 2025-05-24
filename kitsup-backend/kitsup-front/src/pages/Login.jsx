import React, { use, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authThunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, error, isAuthenticated } = useSelector((state) => state.auth);
    const [hasShownSuccess, setHasShownSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isMobile = useMediaQuery('(max-width:600px)');



    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            window.location.replace("/dashboard")
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };


    useEffect(() => {
        // Check if we need to redirect (only runs once after successful auth)

        if (isAuthenticated) {
            console.log("isAuthenticated", isAuthenticated)
            toast.success("Login Successful!", { autoClose: 2000 });

            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

            return () => clearTimeout(timer);
        }

    }, [isAuthenticated, navigate]);
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: 3,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 800,
                    overflow: 'hidden',
                }}
            >
                {/* Image Section using img tag */}
                <Box
                    sx={{
                        width: { xs: '100%', sm: 400 },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                        backgroundColor: '#fafafa',
                    }}
                >
                    <img
                        src="/images/kits.png"
                        alt="Login Visual"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: isMobile ? '200px' : '400px',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                {/* Login Form Section */}
                <Box
                    sx={{
                        width: { xs: '100%', sm: 300 },
                        p: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                        Login
                    </Typography>

                    {isError && (
                        <Typography color="error" textAlign="center">
                            {error}
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </Box>
            </Box>
            <ToastContainer
                position='top-center'
            />
        </Box>
    );
};

export default Login;
