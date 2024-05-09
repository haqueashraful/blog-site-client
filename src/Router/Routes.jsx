import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import App from "../App";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    }
])

export default Routes;