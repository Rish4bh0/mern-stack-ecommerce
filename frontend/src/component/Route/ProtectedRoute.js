import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';




const ProtectedRoute = ({ isAuthenticated, children, isAdmin }) => {


    const { user } = useSelector(state => state.user);
    
    
        if(isAuthenticated === false) {
            return <Navigate to={"/login"} />
        }
        
        if(isAdmin === true && user.role !== "admin") {
            
            return <Navigate to={"/login"} />
            
        }
        
        return children ? children : <Outlet />
    
    
    
    }

    export default ProtectedRoute;