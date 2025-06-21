import axios from "axios";

const BASE_URL = 'https://backend-kitsquiz.onrender.com/api/auth';

// const BASE_URL = "http://localhost:8080/api/auth";

export const loginApi = (credentials) =>
  axios.post(`${BASE_URL}/login`, credentials);

export const registerApi = (userData) =>
  axios.post(`${BASE_URL}/register`, userData);

export const logoutApi = (token) => {
  return axios.post(`${BASE_URL}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const quizUploadApi = async (quizData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/uploadquiz`, quizData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Quiz upload failed:", error);
    throw error;
  }
};

export const getTestByCodeApi = async (testCode, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/test/${testCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching test by code failed:", error);
    throw error;
  }
};

export const studentApi = async (studentData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/student`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Submitting student data failed:", error);
    throw error;
  }
};

export const resultApi = async (testCode, answers, score, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/result/${testCode}/submit`, {
      score,
      answers,
      testCode,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error submitting result:", error);
    return { error: "Failed to submit results." };
  }
};

export const getResultApi = async (testCode, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/getResult/${testCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching result failed:", error);
    throw error;
  }
};

export const getCountApi = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/getCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch count:", error);
    throw error;
  }
};

export const getAllTestApi = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/getalltest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching all tests failed:", error);
    throw error;
  }
};

export const getAllTestByIdApi = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/getalltest/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching tests by ID failed:", error);
    throw error;
  }
};

export const getTeacherTestApi = async (user_id, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/getalltest`, { user_id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching teacher tests failed:", error);
    throw error;
  }
};

export const fetchStudentsByTestcodeAPI = async (testcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/getstudents/${testcode}`);
    return response.data;
  } catch (error) {
    console.error("Fetching students by test code failed:", error);
    throw error;
  }
};

export const fetchTestCount = async (user_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/testcount/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Fetching test count failed:", error);
    throw error;
  }
};

export const deleteTestApi = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tests/${id}`)
    return id;
  } catch (error) {
    console.error("delete test failed:", error);
    throw error;
  }
}


export const leaderBoardApi = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/leaderboard/${id}`);
    return response.data;
  }
  catch (error) {
    console.error("failed to show leaderboard", error);
    throw error;
  }
}

//get test to update test
export const getTestToUpdateApi = async (testcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/test/${testcode}`)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch api data ");
    throw error;
  }
}



//update test code
export const updateQuizApi = async (testcode, payload, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-test/${testcode}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (err) {
    console.log("something went wrong", err);
  }
}