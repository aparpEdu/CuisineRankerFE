import { Navigate } from "react-router-dom";


const SignUpGuard = ({children}) => {

    if (localStorage.getItem("access_token")) {
        return <Navigate to="/profile" replace />;
    }
    return <>{children}</>;
};

export default SignUpGuard;