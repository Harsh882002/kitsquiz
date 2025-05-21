import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';

const InstituteForm = () => {
  const [formData, setFormData] = useState({
    institute_name: '',
    type: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Add Institute Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Institute Name"
            variant="outlined"
            fullWidth
            name="institute_name"
            value={formData.institute_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          sx={{ padding: '10px 20px' }}
        >
          Submit
        </Button>
        <Button variant="contained" color="error" sx={{ padding: '10px 20px' }}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default InstituteForm;
