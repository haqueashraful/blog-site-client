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

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage />,
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
            },
            {
                path: "/allblogs",
                element: <AllBlogs />
            },
            {
                path: "/addblog",
                element: <AddBlogs/>
            },
            {
                path: "/wishlist",
                element: <Wishlist/>
            },
            {
                path: "/featuredblog",
                element: <FeaturedBlogs/>
            },
            {
                path: "/editblog/:id",
                element: <EditBlog />
            },
            {
                path: "/blogdetails/:id",
                element: <PrivateRoute><BlogDetails/></PrivateRoute>,
                // loader: ({params}) => fetch(`https://blog-site-server-lemon.vercel.app/blogs/${params.id}`, {credentials: "include"})
            }
        ]
    }
])

export default Routes;