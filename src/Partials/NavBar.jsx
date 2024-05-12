import { useContext } from "react";
import { Context } from "../Context/MyContext";
import { Link, NavLink } from "react-router-dom";
import { Avatar, WrapItem, background } from "@chakra-ui/react";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const { user, logOutUser, handleChange, isChecked } = useContext(Context);

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
              <NavLink
                  className={({ isActive }) =>
                    isActive ? "!bg-teal-500 !text-white" : ""
                 }
                to="/"
              >
                Homepage
              </NavLink>
            </li>
            <li>
              <NavLink
                  className={({ isActive }) =>
                 isActive ? "!bg-teal-500 !text-white" : ""
              }
                to="/addblog"
              >
                Add Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                  className={({ isActive }) =>
                 isActive ? "!bg-teal-500 !text-white" : ""
              }
                to="/allblogs"
              >
                All blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                 className={({ isActive }) =>
                 isActive ? "!bg-teal-500 !text-white" : ""
              }
                to="/featuredblog"
              >
                Featured Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
               className={({ isActive }) =>
                 isActive ? "!bg-teal-500 !text-white" : ""
              }
                to="/wishlist"
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">HA Blog</a>
      </div>
      <div className="navbar-end flex gap-2">
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

        <div>
          <input id="checkbox" type="checkbox" onChange={handleChange} />
          <label className="switch" htmlFor="checkbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="slider"
            >
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
