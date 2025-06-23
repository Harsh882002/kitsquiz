import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestByCodeAfterTest } from "../features/auth/authThunks";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const FetchTestAfterTest = () => {
  const { testcode } = useParams();
  const dispatch = useDispatch();
  const { currentTest, loading, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
  console.log("useEffect triggered with testcode:", testcode);
  if (testcode && token) {
    dispatch(getTestByCodeAfterTest({ testcode, token }));
  }
}, [dispatch, testcode, token]);


if (loading) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
}

if (!currentTest || !currentTest.questions) {
  return (
    <Alert severity="info" sx={{ mt: 4 }}>
      No test data available.
    </Alert>
  );
}


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom color="primary">
        Test Details
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {currentTest && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Options</TableCell>
                <TableCell>Correct Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTest.questions.map((q, index) => (
                <TableRow key={q.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{q.question_text}</TableCell>
                  <TableCell>
                    <List dense>
                      {Object.entries(q.options).map(([key, value]) => (
                        <ListItem key={key} disableGutters>
                          <ListItemText
                            primary={
                              <strong>
                                {key.toUpperCase()}: {value}
                              </strong>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <strong style={{ color: "green" }}>
                      {q.options[q.correct_answer]}
                    </strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
