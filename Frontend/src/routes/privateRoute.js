
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/common';

const PrivateRoute = ({ element: Element, layOut: LayOut }) => {
    const isAuthenticated = sessionStorage.getItem('prefix');

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return LayOut ? <Layout>{Element}</Layout> : Element;
};

export default PrivateRoute;
