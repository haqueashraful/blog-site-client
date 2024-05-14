import { Outlet } from "react-router-dom";
import NavBar from "../Partials/NavBar";
import Footer from "../Partials/Footer";

const Main = () => {
    return (
        <div className="min-h-screen relative">
         <div className="sticky top-0 !z-auto">
         <NavBar />
         </div>
          <div className="!z-10 my-10 top-10">
          <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
    );
};

export default Main;