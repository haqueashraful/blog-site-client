import { Outlet } from "react-router-dom";
import NavBar from "../Partials/NavBar";
import Footer from "../Partials/Footer";

const Main = () => {
    return (
        <>
        <div className="min-h-screen relative px-2 lg:px-20">
       <div className="sticky top-0 !z-50">
       <NavBar />
       </div>
          <Outlet />
        </div>
            <Footer />
        </>
    );
};

export default Main;