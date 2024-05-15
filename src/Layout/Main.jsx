import { Outlet } from "react-router-dom";
import NavBar from "../Partials/NavBar";
import Footer from "../Partials/Footer";
import { useContext } from "react";
import { Context } from "../Context/MyContext";

const Main = () => {
  const { isChecked } = useContext(Context);

  return (
    <>
      <div  
           className={`min-h-screen relative px-2 py-1 lg:py-3 lg:px-20 ${isChecked? "bg-base-content" : "bg-teal-50"}`}>
        <div className="sticky top-0 !z-50">
          <NavBar />
        </div>
        <div
          className="lg:py-10 py-2"
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
