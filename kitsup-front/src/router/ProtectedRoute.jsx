import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';  // Fixed import

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);  // Now works correctly
        if (decoded.exp * 1000 < Date.now()) {
          dispatch(logout());
          navigate('/');
        }
      } catch (error) {
        dispatch(logout());
        navigate('/');
      }
    }
  }, [token, dispatch, navigate]);

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;