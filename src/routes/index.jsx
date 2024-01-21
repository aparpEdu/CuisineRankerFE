import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import RouteGuard from "../guards/RouteGuard";

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
        ],
    },
]);