import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Profile from "../pages/profile/Profile";
import RouteGuard from "../guards/RouteGuard";
import SignUp from "../pages/authentication/SignUp";
import SignUpGuard from "../guards/SignUpGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        // errorElement: <Error />,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login showHeader={false} />,
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
                    <SignUpGuard>
                        <SignUp />
                    </SignUpGuard>
                ),
                path: "/signup"
            }
        ],
    },
]);