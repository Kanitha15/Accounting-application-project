import React from 'react';
import {Navigate} from 'react-router-dom';
import {getFromLocalStorage} from './Helpers';

const ProtectedRoute = ({children}) => {
    const isAuth = getFromLocalStorage('currentUser');
    return isAuth ? children : <Navigate to={'/'}/>
}
export default ProtectedRoute;