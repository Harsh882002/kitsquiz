import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStudentsByTestcode } from '../../../features/auth/authThunks';

const StudentList = () => {

    const { testcode } = useParams();
    console.log("testcode", testcode)

    const dispatch = useDispatch();
    const { student: students, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchStudentsByTestcode(testcode));
    }, [dispatch, testcode]);  // added testcode in dependency array

    if (!students || students.length === 0) {
        return (
            <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                No students data available.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table stickyHeader aria-label="students table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell> {/* Numbering header */}
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Submitted At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student, idx) => {
                        const firstResult = student.results && student.results.length > 0 ? student.results[0] : null;
                        return (
                            <TableRow key={student.id || idx}>
                                <TableCell>{idx + 1}</TableCell> {/* Numbering */}
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{firstResult?.score ?? '-'}</TableCell>
                                <TableCell>
                                    {firstResult?.submitted_at
                                        ? new Date(firstResult.submitted_at).toLocaleString()
                                        : '-'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentList;
