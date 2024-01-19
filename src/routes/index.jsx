import Layout from "../components/layout/Layout";
import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
// import Home from "../pages/Home";
// import Projects from "../pages/Projects";
// import Archive from "../pages/Archive";


export const router = createBrowserRouter([
    {
        path: "/",
        // errorElement: <Error />,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login showHeader={false} />
            }
        ],
        // children: [
        //     {
        //         index: true,
        //         element: <Home />,
        //         loader: getAllSpecialties,
        //     },
        //     {
        //         path: "/specialists",
        //         element: <Specialists />,
        //         loader: getSpecialistData,
        //         action: getSpecialistsSettings,
        //     },
        // ],
    },
]);
