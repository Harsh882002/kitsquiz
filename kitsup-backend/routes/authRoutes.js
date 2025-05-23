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

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerApi);
router.get('/getUser', getUserData);
router.post('/uploadquiz', uploadQuiz);
router.post('/logout', logoutUser);
router.get('/test/:testCode', getTestData);
router.get('/user/:userId', getUsersTests);
router.post('/student', studentData);
router.post('/result/:testCode/submit', saveResult);
router.get('/getResult/:testCode', getResult);
router.get('/getCount', getUsersCount);
router.get('/getalltest', getAllTests);
router.post('/getalltest', fetchTeacherTests);
router.get('/getstudents/:testcode', studentList);
router.get('/testcount/:user_id', countTests);

export default router;
