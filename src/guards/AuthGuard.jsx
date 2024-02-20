import { Navigate } from "react-router-dom";


const AuthGuard = ({children}) => {

    if (localStorage.getItem("access_token")) {
        return <Navigate to="/profile" replace />;
    }
    return <>{children}</>;
};

export default AuthGuard;