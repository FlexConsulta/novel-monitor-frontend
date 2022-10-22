import React from "react";

import { Navigate } from "react-router-dom";
import Roles from "../../pages/shared/Roles";
import { getLoggedUserInfo } from "../../utils/profile";

const PrivateRoute = ({ route, children }) => {
  if (
    getLoggedUserInfo().profile === Roles.Profiles.clientes ||
    !getLoggedUserInfo().active
  ) {
    if (!Roles.routeAuthorizated(route, getLoggedUserInfo().profile))
      return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
