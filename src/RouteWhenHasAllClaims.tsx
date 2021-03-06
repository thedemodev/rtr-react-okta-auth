import React, { useContext, FC } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import IRouteWhenHasClaimsProps from "./models/IRouteWhenHasClaimsProps";
import { hasAllProperties } from './Intersections';
import DefaultUnauthorized from "./DefaultUnauthorized";
import UnAuthenticated from "./UnAuthenticated";
import IAuthContext from "./models/IAuthContext";

const RouteWhenHasAllClaims: FC<IRouteWhenHasClaimsProps> = props => {
    const { claims, component, unauthorizedComponent, ...rest } = props;
    const authContext = useContext<IAuthContext>(AuthContext);
    const isAuthenticated = authContext.isAuthenticated;
    const intersects = hasAllProperties(authContext.user, claims);
    const compToRender = isAuthenticated
      ? intersects
        ? component
        : !!unauthorizedComponent
        ? unauthorizedComponent
        : DefaultUnauthorized
      : UnAuthenticated;
    return <Route {...rest} component={compToRender} />;
  };

  export default RouteWhenHasAllClaims;