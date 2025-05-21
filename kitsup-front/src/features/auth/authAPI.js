import axios from "axios";

export const loginApi = (credentials) =>
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, credentials);

export const registerApi = (userData) =>
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, userData);

export const logoutApi = (token) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const quizUploadApi = async (quizData, token) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/uploadquiz`,
    quizData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getTestByCodeApi = async (testCode, token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/test/${testCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//Store Student Data
export const studentApi = (studentData, token) => {
 
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/student`, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

//RESULT API
 
export const resultApi = async (testCode, answers, score, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/result/${testCode}/submit`,
      {
        score,
        answers,
        testCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response here if necessary
    if (response.status === 200) {
       return response.data; // Return the response for further handling (like updating Redux state)
    }
  } catch (error) {
    console.error("Error submitting result:", error);
    // You can throw an error or handle it gracefully here
    return { error: "Failed to submit results." };
  }
};



export const getResultApi = async (testCode, token) => {
 
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getResult/${testCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response.data);
    return response.data;
  } catch (error) {
     throw error; // rethrow for further handling
  }
};


//GET COUNT OF ROLES
export const getCountApi = async(token) =>{
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getCount`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  return response.data;
}



//GET All  Test
export const getAllTestApi = async(token) =>{
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getalltest`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  return response.data;
}

//GET ALL TEST BY ID
export const getAllTestByIdApi = async(userId,token) =>{
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getalltest/${userId}`,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  return response.data;
}


//GET TESTS OF PERTICULAR TEACHER
export const getTeacherTestApi = async(user_id,token) =>{
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/getalltest`,{
    user_id
  },{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  return response.data;
}


//GET STUDENTS OF PERTICULAR TEST
export const fetchStudentsByTestcodeAPI = async (testcode) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getstudents/${testcode}`);
     return response.data;
  } catch (error) {
     throw error;  // re-throw or handle appropriately
  }
};

//getting test count
export const fetchTestCount = async (user_id) => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/testcount/${user_id}`);
  return response.data;
};
