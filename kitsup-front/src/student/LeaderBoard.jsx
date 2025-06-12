import React, { useEffect } from 'react';
import {
  Box, Paper, Typography, CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Avatar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getLeaderBoard } from '../features/auth/authThunks';

const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const { leaderboard, isLoading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getLeaderBoard(testId));
  }, [dispatch, testId]);

  if (isLoading) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2} fontWeight="bold" color="primary">Loading Leaderboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" textAlign="center" mt={5}>{error}</Typography>;
  }

  return (
    <Box sx={{
      p: 4,
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0faff, #ffffff)'
    }}>
      <Paper elevation={6} sx={{
        maxWidth: 1000,
        mx: 'auto',
        p: 4,
        borderRadius: 4,
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(to right, #e6f7ff, #f0fff4)',
      }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary" align="center">
          🏆 Top Performers Leaderboard
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
          Top 10 Students based on test performance
        </Typography>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard?.map((student, index) => (
                <TableRow
                  key={student.student_id}
                  hover
                  sx={{
                    transition: '0.3s',
                    '&:hover': { backgroundColor: '#f9f9f9' }
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3', mr: 1 }}>
                        {student.name.charAt(0).toUpperCase()}
                      </Avatar>
                      {student.name}
                    </Box>
                  </TableCell>
                  <TableCell>{student.city}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold" color="green">{student.score}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default LeaderBoardPage;
