import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        // errorElement: <Error />,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login showHeader={false} />
            },
            {
                element: <Profile/>,
                path: "/profile"
            }
        ],
    },
]);