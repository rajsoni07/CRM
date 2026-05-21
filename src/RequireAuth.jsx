import React from "react";
import { Navigate } from "react-router-dom";


const RequireAuth =({children}) => {
    const token = localStorage.getItem("token");

    if(!token) {
        // Not Logged in -> send to login page
        return <Navigate to="/login" replace/>;
    }
    //Logged in -> render the protected UI
    return children;
};
export default RequireAuth;