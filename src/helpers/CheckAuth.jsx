import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../store/Context/AuthContext";

const CheckAuth = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {role} = user
    const location = useLocation()
    const {authDispatch} = useContext(AuthContext)
  // Redirect to login if not authenticated
  if (!isAuthenticated && location.pathname.includes("orders")) {
    authDispatch({type:"login"})
    return <Navigate to={"/"} />;
  }
  if(isAuthenticated && role==="user" && location.pathname.includes("admin")){
    return <Navigate to={"/"}/>
  }
//   if(isAuthenticated && role === "admin" && location.pathname.includes("admin")){
//     return <Navigate to={"/admin"}/>
//   }

  return <>{children}
  </>;
};

export default CheckAuth;
