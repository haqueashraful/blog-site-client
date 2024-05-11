import { useContext } from "react";
import { Context } from "../Context/MyContext";
import { Link } from "react-router-dom";
import { Avatar, WrapItem, background } from "@chakra-ui/react";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const { user, logOutUser } = useContext(Context);

  const handleLogOut = () => {
    logOutUser();
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/addblog">Add Blog</Link>
            </li>
            <li>
              <Link to="/allblogs">All blogs</Link>
            </li>
            <li>
              <Link to="/featuredblog">Featured Blogs</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <WrapItem
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user?.displayName}
            >
              <Avatar name={user?.displayName} src={user?.photoURL} />
            </WrapItem>
            <Tooltip
              id="my-tooltip"
              style={{
                backgroundColor: "#50C9C5",
                color: "white",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-warning ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline btn-success hover:!bg-green-300"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
