import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Profile from "../pages/profile/Profile";
import RouteGuard from "../guards/RouteGuard";
import SignUp from "../pages/authentication/SignUp";
import AuthGuard from "../guards/AuthGuard";
import Error from "../pages/error/Error";
import ConfirmedEmail from "../pages/confirm_email/ConfirmedEmail";
import ForgotPassword from "../pages/forgot_password/ForgotPassword";
import ResetPassword from "../pages/reset_password/ResetPassword";
import Spinner2 from "../components/spinner/Spinner2";


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
            },
            {
                element: <ConfirmedEmail />,
                path: "/auth/confirm"
            },
            {
                element: (
                        <AuthGuard>
                            <ForgotPassword />
                        </AuthGuard>
                ),
                path: "/forgot-password"
            },
            {
                element: (
                    <AuthGuard>
                        <ResetPassword />
                    </AuthGuard>
                ),
                path: "/auth/reset"
            },
            {
                element: <Spinner2 />,
                path: "spin"
            }
        ],
    },
]);