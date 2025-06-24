import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherOfInstitute } from "../../features/auth/authThunks";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";

export const SeeTachersOfInsitute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const { teachers = [], loading, error } = useSelector((state) => state.auth);
console.log("data",teachers)
   const token = localStorage.getItem("token");

  useEffect(() => {
    if (id && token) {
      dispatch(getTeacherOfInstitute({ id, token }));
    }
  }, [dispatch, id, token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4} px={2}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Teachers of Institute
      </Typography>

      {teachers.length === 0 ? (
        <Typography textAlign="center">No teachers found.</Typography>
      ) : (
        <Grid container spacing={2} direction="column">
          {teachers.map((teacher) => (
            <Grid item key={teacher.id}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography>Employee_id: {teacher.employee_id}</Typography>
                <Typography variant="h6">Name : {teacher.full_name}</Typography>
                <Typography>Department: {teacher.department}</Typography>
                <Typography>Gender: {teacher.gender}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
