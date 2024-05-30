import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import App from "../App";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AllBlogs from "../Pages/AllBlogs";
import AddBlogs from "../Pages/AddBlogs";
import Wishlist from "../Pages/Wishlist";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import EditBlog from "../Pages/EditBlog";
import BlogDetails from "../Pages/BlogDetails";
import PrivateRoute from "../Authentication/PrivateRoute";
import ErrorPage from "../Component/ErrorPage";
import Home from "../Pages/Home";
import Subscription from "../Pages/SubsCription";
import Subscriber from "../Pages/Subscriber";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/allblogs",
                element: <AllBlogs />
            },
            {
                path: "/addblog",
                element: <PrivateRoute><AddBlogs/></PrivateRoute>
            },
            {
                path: "/wishlist",
                element: <PrivateRoute><Wishlist/></PrivateRoute>
            },
            {
                path: "/featuredblog",
                element: <FeaturedBlogs/>
            },
            {
                path: "/editblog/:id",
                element: <PrivateRoute><EditBlog/></PrivateRoute>
            },
            {
                path: "/blogdetails/:id",
                element: <PrivateRoute><BlogDetails/></PrivateRoute>,
            },
            {
                path: "/subscription",
                element:<PrivateRoute><Subscription/></PrivateRoute>,
            },
            {
                path: "/subscription/success",
                element: <PrivateRoute><Subscriber/></PrivateRoute>,
            }
        ]
    }
])

export default Routes;