import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {
  deleteTestApi,
  fetchStudentsByTestcodeAPI,
  fetchTestCount,
  getAllTestApi,
  getAllTestByIdApi,
  getAllTestsOfInstituteApi,
  getCountApi,
  getResultApi,
  getTeacherOfInstituteApi,
  getTeacherTestApi,
  getTestByCodeAfterTestApi,
  getTestByCodeApi,
  getTestToUpdateApi,
  leaderBoardApi,
  loginApi,
  logoutApi,
  quizUploadApi,
  registerApi,
  resultApi,
  studentApi,
  updateQuizApi,
} from "./authAPI.js";

//LOGIN API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);

      const user = response.data.user;
      const token = response.data.token;

      // Save to localStorage (optional here, since slice also does it)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 Return the structured payload your slice expects
      return { user, token };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

//REGISTER API
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Registration Failed"
      );
    }
  }
);

//LOGOUT API
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const response = await logoutApi(token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Logout Failed");
    }
  }
);

export const quizUpload = createAsyncThunk(
  "auth/quizUpload",
  async ({ quizUploadData, token }, { rejectWithValue }) => {
    try {
      const response = await quizUploadApi(quizUploadData, token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Quiz Upload failed"
      );
    }
  }
);

//Thunk for test api

export const getTestByCode = createAsyncThunk(
  "test/getTestByCode",
  async ({ testCode, token }, { rejectWithValue }) => {
    try {
      const response = await getTestByCodeApi(testCode, token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);

//STUDENT store Data
export const studentData = createAsyncThunk(
  "auth/studentdata",
  async ({ studentData, token }, { rejectWithValue }) => {
    try {
      const response = await studentApi(studentData, token); // Simplified
      console.log("API Response:", response.data); // ✅ Must contain { token: "..." }
      return response;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Student Add Failed"
      );
    }
  }
);

//RESULT API THUNK
export const saveResult = createAsyncThunk(
  "auth/submitTest",
  async ({ testCode, answers, score, token }, { rejectWithValue }) => {
    try {
      const response = await resultApi(testCode, answers, score, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Submission failed"
      );
    }
  }
);

//GET RESULT
export const getResult = createAsyncThunk(
  "test/getresult",
  async ({ testCode, token }, { rejectWithValue }) => {
    try {
      const response = await getResultApi(testCode, token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);
//to clear result
export const resetResult = createAction("auth/resetResult");

//GET COUNT
export const getCount = createAsyncThunk(
  "test/getcount",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await getCountApi(token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);

//GET ALL TEST
export const getTestData = createAsyncThunk(
  "test/gettest",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await getAllTestApi(token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);

//GET TESTS OF PERTICULAR TEACHER
export const getTeacherTests = createAsyncThunk(
  "test/getTeacherTest",
  async ({ user_id, token }, { rejectWithValue }) => {
    try {
      const response = await getTeacherTestApi(user_id, token);
      console.log("response", response);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);

//GET ALL students BY testcode
export const fetchStudentsByTestcode = createAsyncThunk(
  "auth/fetchStudentsByTestcode",
  async (testcode, thunkAPI) => {
    try {
      const data = await fetchStudentsByTestcodeAPI(testcode);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

//getting test count

export const getTestCount = createAsyncThunk(
  "auth/getTestCount",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const data = await fetchTestCount(user_id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteTest = createAsyncThunk(
  "auth/deleteTest",
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await deleteTestApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getLeaderBoard = createAsyncThunk(
  "auth/getLeaderboard",
  async (testId, { rejectWithValue }) => {
    try {
      const data = await leaderBoardApi(testId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Leaderboard fetch failed"
      );
    }
  }
);

export const getTestToUpdate = createAsyncThunk(
  "auth/getTestToUpdate",
  async (testcode, { rejectWithValue }) => {
    try {
      const data = await getTestToUpdateApi(testcode);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Leaderboard fetch failed"
      );
    }
  }
)


//update test 
export const updateQuiz = createAsyncThunk(
  'auth/updateQuiz',
  async ({ testcode, payload, token }, { rejectWithValue }) => {
    try {
      const data = await updateQuizApi(testcode, payload, token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Quiz Update Failed"
      )
    }
  }
)


export const getTestByCodeAfterTest = createAsyncThunk(
  'auth/getTestByCodeAfterTest',
  async ({ testcode, token }, { rejectWithValue }) => {
    console.log("testcode", testcode)
    try {
      const response = await getTestByCodeAfterTestApi(testcode, token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      );
    }
  }
);


export const getTeacherOfInstitute = createAsyncThunk(
  'auth/getTeacherOfInstitute',
  async ({ id, token }, rejectWithValue) => {
    try {
      const response = await getTeacherOfInstituteApi(id, token);
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test"
      )
    }
  }
)


export const getAllTestsOfInstitute = createAsyncThunk(
  'auth/getAllTestsOfInstitute',
  async({institute_id,token},rejectWithValue) =>{
    try{
      const response = await getAllTestsOfInstituteApi(institute_id,token);
      console.log("response",response)
        return response;
    }catch(err){
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch data"
      )
    }
  }
)