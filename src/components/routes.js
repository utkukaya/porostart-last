import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import Atölye from "../pages/Atölye";
import Ekip from "../pages/Ekip";
import LoginForm from "../pages/Login";
import Oyun from "../pages/Oyun";

const router = ([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/oyun",
        element: <Oyun />,
    },
    {
        path: "/hakkımızda",
        element: <AboutUs />,
    },
    {
        path: "/atölye",
        element: <Atölye />,
    },
    {
        path: "/ekip",
        element: <Ekip />,
    },
    {
        path: "/login",
        element: <LoginForm />,
    },
]);

export default router;