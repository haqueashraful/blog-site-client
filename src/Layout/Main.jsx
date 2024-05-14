import { Outlet } from "react-router-dom";
import NavBar from "../Partials/NavBar";

const Main = () => {
    return (
        <div className="min-h-screen relative">
         <div className="sticky top-0 z-auto">
         <NavBar />
         </div>
            <Outlet />
        </div>
    );
};

export default Main;