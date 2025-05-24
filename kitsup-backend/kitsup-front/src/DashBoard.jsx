import { useNavigate } from "react-router-dom";
import SuperAdmin from "./pages/Admin/SuperAdmin";
import Institute from "./pages/Institute/Institute";
import Teacher from "./pages/Teacher/Teacher";

import React, { useEffect } from 'react'

const DashBoard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect to login/home if no user found
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate])

    if (!user) return null;


    const userRole = user.role;

    if (userRole === 'superadmin') {
        return <SuperAdmin />
    } else if (userRole === 'institutes') {
        return <Institute />
    } else if (userRole === 'teachers') {
        return <Teacher />
    } else {
        return <h1>User Not Found</h1>
    }
};

export default DashBoard
