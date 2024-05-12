import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../Component/Loading";
import { Context } from "../Context/MyContext";

const PrivateRoute = ({ children }) => {
  const {user, loader } = useContext(Context);
  const location = useLocation();


  if (loader) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;