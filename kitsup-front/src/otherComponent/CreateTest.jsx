import React, { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Paper,
    Divider,
    Stack,
    Alert,
    IconButton,
    Tooltip
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { quizUpload } from '../features/auth/authThunks';
import CopyTextButton from './CopyText';

const CreateTestForm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.auth.user?.id);

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        quecount: '',
        expire_at: new Date(new Date().getTime() + 60 * 60 * 1000),
        negative_marking: false,
        randomize: false,
        rawQuestions: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [testLink, setTestLink] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    console.log("Forma: ", formData)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            expire_at: date
        }));
    };

    const formatQuestions = (raw) => {
        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                throw new Error('Input must be a JSON array of question objects.');
            }

            return parsed.map((q, i) => {
                if (!q.question_text || !q.options ||
                    !['a', 'b', 'c', 'd'].every(k => q.options.hasOwnProperty(k)) ||
                    !['a', 'b', 'c', 'd'].includes(q.correct_answer)) {
                    throw new Error(`Question ${i + 1} has invalid format.`);
                }
                return q;
            });
        } catch (e) {
            throw new Error('Invalid JSON format. Please check your input.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.duration || !formData.quecount || !formData.rawQuestions.trim()) {
            setError('Please fill all required fields.');
            return;
        }

        try {
            const formattedQuestions = formatQuestions(formData.rawQuestions);
            if (formattedQuestions.length !== parseInt(formData.quecount)) {
                setError(`You specified ${formData.quecount} questions but provided ${formattedQuestions.length}.`);
                return;
            }

            const payload = {
                user_id,
                title: formData.title,
                duration: formData.duration,
                expire_at: formData.expire_at.getFullYear() + '-' +
                    String(formData.expire_at.getMonth() + 1).padStart(2, '0') + '-' +
                    String(formData.expire_at.getDate()).padStart(2, '0') + ' ' +
                    String(formData.expire_at.getHours()).padStart(2, '0') + ':' +
                    String(formData.expire_at.getMinutes()).padStart(2, '0') + ':' +
                    String(formData.expire_at.getSeconds()).padStart(2, '0'),
                negative_marking: formData.negative_marking ? 1 : 0,
                randomize: formData.randomize ? 1 : 0,
                questions: formattedQuestions,
            };

            setLoading(true);
            const result = await dispatch(quizUpload({ quizUploadData: payload, token })).unwrap();

            const generatedLink = `${window.location.origin}/test/${result.testCode}`;
            setTestLink(generatedLink);

            // Reset form but keep some values
            setFormData(prev => ({
                ...prev,
                title: '',
                duration: '',
                negative_marking: '',
                rawQuestions: '',
                quecount: ''
            }));

        } catch (err) {
            setError(`❌ ${err.message || 'Upload failed. Please check your input.'}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(testLink);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    📘 Create New Test
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

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
                                minDateTime={new Date()}
                                renderInput={(params) => <TextField fullWidth {...params} required />}
                            />
                        </LocalizationProvider>

                        <CopyTextButton                        />
                        <TextField
                            fullWidth
                            label="Paste Questions (JSON)"
                            multiline
                            rows={12}
                            name="rawQuestions"
                            value={formData.rawQuestions}
                            onChange={handleChange}
                            placeholder={`[\n  {\n    "question_text": "Your question?",\n    "options": {\n      "a": "Option A",\n      "b": "Option B",\n      "c": "Option C",\n      "d": "Option D"\n    },\n    "correct_answer": "a"\n  }\n]`}
                            helperText="Paste valid JSON array of questions. Each must have question_text, options (a-d), and correct_answer."
                            required
                        />

                        <Box>
                            <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                                Test Settings
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="negative_marking"
                                                checked={formData.negative_marking}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Enable Negative Marking"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="randomize"
                                                checked={formData.randomize}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Randomize Questions/Options"
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Creating...' : 'Create Test'}
                        </Button>
                    </Stack>
                </form>

                {/* Test Link Section - Only shows after creation */}
                {testLink && (
                    <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Test Created Successfully!
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    wordBreak: 'break-all',
                                    bgcolor: 'action.hover',
                                    p: 1,
                                    borderRadius: 1,
                                    flexGrow: 1
                                }}
                            >
                                {testLink}
                            </Typography>

                        </Box>
                        {copySuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Link copied to clipboard!
                            </Alert>
                        )}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={copyToClipboard}
                        // startIcon={<ContentCopyIcon />}
                        >
                            Copy Test Link
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default CreateTestForm;