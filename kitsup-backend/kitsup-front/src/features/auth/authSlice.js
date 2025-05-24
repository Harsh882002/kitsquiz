import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchStudentsByTestcode,
  getCount,
  getResult,
  getTeacherTests,
  getTestByCode,
  getTestCount,
  getTestData,
  loginUser,
  logoutUser,
  quizUpload,
  registerUser,
  resetResult,
  saveResult,
  studentData,
} from "./authThunks.js";

const storedUser = localStorage.getItem("user");
const userFromStorage =
  storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    token: userFromStorage ? localStorage.getItem("token") : null,
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    isLogoutSuccess: false,
    isRegister: false,
    isStudentData: false,
    error: "",
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLogoutSuccess = true; // Add this flag
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    resetStatus: (state) => {
      state.isError = false;
      state.error = "";
    },
    resetLogoutState: (state) => {
      state.isLogoutSuccess = false; // Add this to reset the flag
    },
    resetRegisterState: (state) => {
      state.isRegister = false;
    },
  },
  extraReducers: (builder) => {
    //Login Cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Login Failed";

        // Show error toast if login fails
        toast.error(state.error); // Error Toast
      });

    //Register Cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isRegister = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegister = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    //Logout Cases
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLogoutSuccess = true;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
      });

    //QuizUpload Cases
    builder
      .addCase(quizUpload.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(quizUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadResult = action.payload;
      })
      .addCase(quizUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

    //Test Api
    builder
      .addCase(getTestByCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestByCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTest = action.payload;
      })
      .addCase(getTestByCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //STUDENT API
    builder
      .addCase(studentData.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.errorMessage = null;
        state.isStudentData = false;
      })
      .addCase(studentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.isStudentData = true;
      })
      .addCase(studentData.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });

    //RESULT API
    builder
      .addCase(saveResult.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
      })
      .addCase(saveResult.fulfilled, (state, action) => {
        state.submitting = false;
        state.result = action.payload;
      })
      .addCase(saveResult.rejected, (state, action) => {
        state.submitTest = false;
        state.submitError = action.payload;
      });

    builder
      .addCase(getResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTest = action.payload;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetResult, (state) => {
        state.currentTest = null;
        state.isLoading = false;
        state.error = null;
      });

    builder
      .addCase(getCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(getCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTestData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.test = action.payload;
      })
      .addCase(getTestData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTeacherTests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeacherTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.test = action.payload;
      })
      .addCase(getTeacherTests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchStudentsByTestcode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByTestcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentsByTestcode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch students";
      });

    //Gettting Test Count for Teacher
    builder
      .addCase(getTestCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testCount = action.payload.count;
      })
      .addCase(getTestCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetStatus } = authSlice.actions;
export default authSlice.reducer;
