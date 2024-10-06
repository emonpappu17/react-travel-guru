
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Search from "../Pages/Search/Search";
import Login from "../Pages/Login/Login";
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/search',
                element: <PrivateRoutes><Search></Search></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/createAccount',
                element: <CreateAccount></CreateAccount>
            }
        ]
    }
])
export default router;