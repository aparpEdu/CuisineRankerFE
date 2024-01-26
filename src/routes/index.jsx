import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Profile from "../pages/profile/Profile";
import RouteGuard from "../guards/RouteGuard";
import SignUp from "../pages/authentication/SignUp";
import AuthGuard from "../guards/AuthGuard";
import Error from "../pages/error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error />,
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <AuthGuard>
                        <Login showHeader={false} />
                    </AuthGuard>
                ),
            },
            {
                element: (
                    <RouteGuard>
                        <Profile />
                    </RouteGuard>
                ),
                path: '/profile',
            },
            {
                element: (
                    <AuthGuard>
                        <SignUp />
                    </AuthGuard>
                ),
                path: "/signup"
            }
        ],
    },
]);