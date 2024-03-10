import { Navigate } from "react-router-dom";


const AuthGuard = ({children}) => {

    if (localStorage.getItem("access_token")) {
        return <Navigate to="/explore" replace />;
    }
    return <>{children}</>;
};

export default AuthGuard;