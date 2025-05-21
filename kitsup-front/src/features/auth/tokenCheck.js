import { jwtDecode } from 'jwt-decode';  // Note the curly braces
import { logout } from '../features/auth/authSlice';
import store from '../app/store';

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      const decoded = jwtDecode(token);  // Now using named import
      if (decoded.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        return true; // token was expired
      }
    } catch (error) {
      store.dispatch(logout());
      return true; // invalid token
    }
  }
  return false; // token valid or doesn't exist
};