import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'; 

// Redux
import { useDispatch } from 'react-redux';
import { deleteTest } from '../../../features/auth/authThunks';
 
const RecentQuiz = ({ tests, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleDelete = async (id) => {
    console.log("idd",id)
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteTest({ id })).unwrap(); // .unwrap throws if rejected
        Swal.fire('Deleted!', 'Quiz has been deleted.', 'success');

        // Notify parent to remove from list
        if (onDeleteSuccess) onDeleteSuccess(id);
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete quiz.', 'error');
      }
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 5,
        width: '100%',
        backgroundColor: '#f0f4f8',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recent Quizzes
      </Typography>
      <List>
        {tests?.data?.length > 0 ? (
          [...tests.data]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((quiz) => (
              <React.Fragment key={quiz.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ paddingY: 2, display: 'flex', width: '100%' }}
                >
                  {/* Left side: Quiz details */}
                  <Box sx={{ width: '50%', pr: 2, textAlign: 'left' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(quiz.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {quiz.duration} minutes
                    </Typography>
                  </Box>

                  {/* Right side: Buttons */}
                  <Box
                    sx={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      sx={{
                        paddingX: 2,
                        paddingY: 1,
                        fontSize: '0.9rem',
                      }}
                      onClick={() => navigate(`/dashboard/test/${quiz.testcode}`)}
                    >
                      See Students
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      sx={{
                        paddingX: 2,
                        paddingY: 1,
                        fontSize: '0.9rem',
                      }}
                      onClick={() => handleDelete(quiz.testcode)}
                    >
                      Delete
                    </Button>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No quizzes found.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default RecentQuiz;
