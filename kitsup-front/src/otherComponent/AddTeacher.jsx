import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { registerUser } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';

const genders = ['Male', 'Female', 'Other'];

const AddTeacherForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, isRegister } = useSelector(state => state.auth);
  const navigate = useNavigate();

   const user = JSON.parse(localStorage.getItem('user'));
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    department: '',
    employeeId: '',
    password: '',
    role: 'teachers',
  institute_id:user.profile.id,
  });

  console.log(formData)

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch registerUser and wait for it to complete
    dispatch(registerUser(formData));

  };

  useEffect(() => {
    if (isRegister) {
      toast.success('Teacher Added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        employeeId: '',
        password: '',
        role: '',
      })

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500)
    }
   }, [isRegister, navigate]);


  return (
    <Box p={4} maxWidth={500} mx="auto">
      <Typography variant="h5" gutterBottom textAlign="center">
        Add New Teacher
      </Typography>

      {isError && <Typography color='error'>{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            select
            label="Gender"
            name="gender"
            fullWidth
            required
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Department"
            name="department"
            fullWidth
            required
            value={formData.department}
            onChange={handleChange}
          >

          </TextField>

          <TextField
            label="Employee ID"
            name="employeeId"
            fullWidth
            required
            value={formData.employeeId}
            onChange={handleChange}
          />

          <TextField
            label="Role"
            name="role"
            fullWidth
            required
            value="Teacher"
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            {isLoading ? 'Adding....' : "Add Teacher"}
          </Button>
        </Stack>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </Box>
  );
};

export default AddTeacherForm;
