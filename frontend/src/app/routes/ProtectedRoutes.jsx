import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    let { user, isLoading } = useSelector((store) => store.auth);
    
    
    if (isLoading) {
        console.log("Protected Routes loading", isLoading);
       return  <h1>Loading...</h1>
    }
    
    if (!user) {
        console.log("Protected Routes !user", user);
        return <Navigate to="/" />
    }
    console.log("Protected Routes main");

    return <Outlet />
}

export default ProtectedRoutes