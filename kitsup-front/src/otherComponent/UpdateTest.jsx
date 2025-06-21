import React, { useEffect, useState } from 'react';
import {
    Box, TextField, Button, Checkbox, FormControlLabel, Typography,
    Paper, Divider, Stack, Alert
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getTestToUpdate, updateQuiz } from '../features/auth/authThunks';

const UpdateTestForm = () => {
    const dispatch = useDispatch();
    const { testcode } = useParams();
    const token = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.auth.user?.id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        quecount: '',
        expire_at: new Date(),
        negative_marking: false,
        randomize: false,
        rawQuestions: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await dispatch(getTestToUpdate(testcode)).unwrap();
                setFormData({
                    title: response.title,
                    duration: response.duration,
                    quecount: response.questions.length,
                    expire_at: new Date(response.expire_at),
                    negative_marking: response.negative_marking === 1,
                    randomize: response.randomize === 1,
                    rawQuestions: JSON.stringify(response.questions, null, 2)
                });
            } catch (err) {
                setErrors('Failed to load test data');
            }
        };
        fetchTest();
    }, [testcode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            expire_at: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setSuccess(false);

        try {
            const questions = JSON.parse(formData.rawQuestions);
            const formatDateTime = (date) => {
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
                    .getDate()
                    .toString()
                    .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
            };
            const formattedExpireAt = formatDateTime(formData.expire_at); // converts Date to string


            const payload = {
                user_id,
                title: formData.title,
                duration: formData.duration,
                expire_at: formattedExpireAt,
                negative_marking: formData.negative_marking ? 1 : 0,
                randomize: formData.randomize ? 1 : 0,
                questions: JSON.parse(formData.rawQuestions)
            };
            console.log(payload)

            setLoading(true);
            await dispatch(updateQuiz({ testcode, payload, token })).unwrap();
            toast.success("Test updated successfully!", { autoClose: 2000 });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Wait for toast to show

        } catch (err) {
            console.log(err)
            setErrors(err.response?.data?.error || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    ✏️ Update Test
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {errors && <Alert severity="error">{errors}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Test Name"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Duration (minutes)"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Number of Questions"
                            name="quecount"
                            type="number"
                            value={formData.quecount}
                            onChange={handleChange}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Expire Date & Time"
                                value={formData.expire_at}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField fullWidth {...params} required />}
                            />
                        </LocalizationProvider>
                        <TextField
                            fullWidth
                            label="Questions (JSON)"
                            name="rawQuestions"
                            multiline
                            rows={12}
                            value={formData.rawQuestions}
                            onChange={handleChange}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.negative_marking}
                                    onChange={handleChange}
                                    name="negative_marking"
                                />
                            }
                            label="Enable Negative Marking"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.randomize}
                                    onChange={handleChange}
                                    name="randomize"
                                />
                            }
                            label="Randomize Questions/Options"
                        />
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Test'}
                        </Button>
                    </Stack>
                </form>
            </Paper>
            <ToastContainer position='top-center' />
        </Box>
    );
};

export default UpdateTestForm;
