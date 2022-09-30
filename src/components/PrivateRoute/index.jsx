import React from "react";

import { Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Roles from "../../pages/shared/Roles";

const jwt = localStorage.getItem('jwt-monitor-banco');

const PrivateRoute = ({ route, children }) => {
    if (jwt) {
        const { active, profile: role } = jwt_decode(jwt).data;
        if (role === Roles.Profiles.clientes || !active) {
            if (!Roles.routeAuthorizated(route, role))
                return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};


export default PrivateRoute;