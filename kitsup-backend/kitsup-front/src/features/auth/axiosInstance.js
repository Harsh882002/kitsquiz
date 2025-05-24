import axios from "axios";
 import { store } from "../../app/store";
import { logout } from "./authSlice";


const axiosInstance = axios.create({
    baseURL : "http://localhost:5173/api/auth"
});

axiosInstance.interceptors.response.use(
    response => response,
    error =>{
        //if there iss a amessge of unauthorized token

        if(error.response && error.response.status === 401){
           store.dispatch(logout());
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;