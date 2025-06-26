import React, { useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTestsOfInstitute } from '../../../features/auth/authThunks';

 

const InsituteQuizzes = () => {

  const dispatch = useDispatch();
  const {tests = [], isLoading, error} =  useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const institute = JSON.parse(localStorage.getItem('user'));
  const institute_id = institute?.profile?.id;

  useEffect(() =>{
    if(institute_id && token){
      dispatch(getAllTestsOfInstitute({institute_id,token}));
    }
  },[dispatch,institute_id,token]);

  if(isLoading){
    return(
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      >
        <CircularProgress color='secondary' />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Recent Quizzes Taken
      </Typography>
      <Grid container spacing={3}>
        {tests.map((quiz, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      By {quiz.teacher.full_name} , {quiz.teacher.department} Department
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1">
                  Score: <strong>{quiz.questions}</strong>  
 3                </Typography>
                <Typography variant="body1">
                   Duration : <strong>{quiz.duration} </strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default  InsituteQuizzes;
