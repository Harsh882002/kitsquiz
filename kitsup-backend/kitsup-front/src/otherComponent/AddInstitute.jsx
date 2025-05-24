import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authThunks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const instituteTypes = ['School', 'College', 'University', 'Coaching', 'Training Center'];

const AddInstituteForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, error, isRegister } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        type: '',
        city: '',
        state: '',
        role: 'institutes',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    useEffect(() => {
        if (isRegister) {
            toast.success('Added successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                type: '',
                city: '',
                state: '',
                role: '',
                password: '',
            });

            setTimeout(() => {
                navigate('/dashboard'); // Update this path if your dashboard route is different
            }, 2500); // Delay to allow the toast to be seen
        }
    }, [isRegister, navigate]);

    return (
        <Box maxWidth={600} mx="auto" mt={4} p={3} boxShadow={3} borderRadius={2}>
            <Typography variant="h5" gutterBottom>
                Add Institute
            </Typography>

            {isError && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Institute Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            type="tel"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            select
                            label="Institute Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            {instituteTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value="institute"
                            disabled
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            type="password"
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <ToastContainer position="top-center" autoClose={2000} />
        </Box>
    );
};

export default AddInstituteForm;
