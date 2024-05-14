import { Outlet } from "react-router-dom";
import NavBar from "../Partials/NavBar";
import Footer from "../Partials/Footer";

const Main = () => {
    return (
        <div className="min-h-screen relative">
       <div className="sticky top-0 !z-50">
       <NavBar />
       </div>
          <Outlet />
            <Footer />
        </div>
    );
};

export default Main;