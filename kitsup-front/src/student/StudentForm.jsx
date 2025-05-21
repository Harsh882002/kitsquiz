import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    Grid,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { studentData } from '../features/auth/authThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        collegename: '',
        city: '',
    });

    const { isError, isLoading } = useSelector((state) => state.auth);
    const { testCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(studentData({
                studentData: {
                    ...formData,
                    testCode: testCode  // include testCode here
                },
                token: null // or token if you're using it
            })).unwrap();


            const tokenFromResponse = response?.token;
            const user = response?.student;

            if (tokenFromResponse) {
                localStorage.setItem("token", tokenFromResponse);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success('All The Best!  Redirecting to instructions...', {
                    autoClose: 2000,
                    hideProgressBar: false,
                    position: "top-center",
                    theme: "colored",
                    style: {
                        fontWeight: 'bold',
                        fontSize: '16px',
                        padding: '16px 24px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                    },
                });

                setTimeout(() => {
                    navigate(`/test/${testCode}/instuctions`);
                }, 2500);
            } else {
                toast.error('Failed to get token. Try again!');
            }
        } catch (err) {
            console.error("Submit error:", err);
            toast.error('Registration failed. Please try again!');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <ToastContainer />

            <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight="bold"
                color="secondary"
                fontFamily={'monospace'}
            >
                Welcome Students
            </Typography>

            <Paper
                elevation={4}
                sx={{
                    maxWidth: 1000,
                    mx: 'auto',
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: '#fafafa',
                }}
            >
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    flexDirection={{ xs: 'column', md: 'row' }}
                >
                    {/* Image */}
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent="center">
                            <img
                                src="/images/kits.png"
                                alt="Student"
                                style={{ width: '100%', maxWidth: 400, borderRadius: 10 }}
                            />
                        </Box>
                    </Grid>

                    {/* Form */}
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            fontWeight="bold"
                            fontFamily="Roboto"
                        >
                            Student Registration Form
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            mt={2}
                        >
                            <TextField
                                name="name"
                                label="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="number"
                                label="Phone Number"
                                type="tel"
                                value={formData.number}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                                required
                            />
                            <TextField
                                name="collegename"
                                label="College Name / Institute Name"
                                value={formData.collegename}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                name="city"
                                label="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default StudentForm;
