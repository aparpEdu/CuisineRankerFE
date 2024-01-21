import { Navigate } from "react-router-dom";


const RouteGuard = ({children}) => {

    if (!localStorage.getItem("access_token")) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default RouteGuard;