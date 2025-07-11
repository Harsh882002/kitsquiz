import express from 'express';
import { loginUser } from '../controllers/login.js';
import { registerApi } from '../controllers/register.js';
import { getUserData } from '../controllers/getUserData.js';
import { logoutUser } from '../controllers/logout.js';
import { uploadQuiz } from '../controllers/uploadQuiz.js';
import { getTestData } from '../test/getTest.js';
import { getUsersTests } from '../test/getAllTest.js';
import { studentData } from '../student/studentData.js';
import { saveResult } from '../results/saveResult.js';
import { getResult } from '../results/getResult.js';
import { getUsersCount } from '../count/getUsersCount.js';
import { getAllTests } from '../test/getAllTests.js';
import authMiddleware from '../middleware/auth.js';
import { fetchTeacherTests } from '../test/fetchTeacherTests.js';
import { studentList } from '../student/studentList.js';
import { countTests } from '../teachers/countTests.js';
import { deleteTest } from '../test/deleteTests.js';
import { getLeaderBoard } from '../student/leaderboard.js';
import { updateQuiz } from '../controllers/updateQuiz.js';
import { getTeacherOfInstitute } from '../institute/getTeacher.js';
import { getAllTestsOfInstitute } from '../institute/getAllTestsOfInstitute.js';

const app = express();

app.post('/login', loginUser);
app.post('/register', registerApi);
app.get('/getUser', getUserData);
app.post('/uploadquiz', uploadQuiz);
app.post('/logout', logoutUser);
app.get('/test/:testCode', getTestData);
app.get('/user/:userId', getUsersTests);
app.post('/student', studentData);
app.post('/result/:testCode/submit', saveResult);
app.get('/getResult/:testCode', getResult);
app.get('/getCount', getUsersCount);
app.get('/getalltest', getAllTests);
app.post('/getalltest', fetchTeacherTests);
app.get('/getstudents/:testcode', studentList);
app.get('/testcount/:user_id', countTests);
app.delete('/tests/:id',deleteTest);
app.get('/leaderboard/:test',getLeaderBoard)
app.put('/update-test/:testCode',updateQuiz);
app.get('/answers/:testCode', getTestData);
app.get('/institute-teacher/:id',getTeacherOfInstitute);
app.get('/all-test/:institute_id',getAllTestsOfInstitute);

export default app;
