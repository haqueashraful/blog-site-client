import { useContext } from "react";
import { Context } from "../Context/MyContext";
import { Link, NavLink } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  WrapItem,
} from "@chakra-ui/react";
import { Tooltip } from "react-tooltip";
import { IoMdAdd, IoMdHome } from "react-icons/io";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdFeaturedVideo } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const NavBar = () => {
  const { user, logOutUser, handleChange, isChecked } = useContext(Context);

  const handleLogOut = () => {
    logOutUser();
  };
  return (
    <div className="flex justify-between items-center !z-auto py-1 bg-white/60 rounded-l-full rounded-r-full  border px-5 shadow-md">
      <Menu className="!z-auto">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<RxHamburgerMenu />}
          variant="outline"
          className={`!border !rounded-full ${
            isChecked ? "!text-black border-black" : "!text-black !border-black"
          }`}
        />
        <MenuList className="space-y-2 !z-auto">
          <NavLink
            type="button"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start items-center z-auto gap-1 px-3"
            }
            to="/"
          >
            <IoMdHome className="text-xl mr-3" />
            <span>Homepage</span>
          </NavLink>
          <NavLink
            type="button"
            id="menu-list-:rb:-menuitem-:rd:"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white   flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start z-auto items-center gap-1 px-3"
            }
            to="/addblog"
          >
            <IoMdAdd className="text-xl mr-3" />
            <span>Add Blog</span>
          </NavLink>
          <NavLink
            type="button"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start z-auto items-center gap-1 px-3"
            }
            to="/allblogs"
          >
            <RiDashboardHorizontalLine className="text-xl mr-3" />
            <span> All blogs</span>
          </NavLink>
          <NavLink
            type="button"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start z-auto items-center gap-1 px-3"
            }
            to="/featuredblog"
          >
            <MdFeaturedVideo className="text-xl mr-3" />
            <span>Featured Blog</span>
          </NavLink>
          <NavLink
            type="button"
            id="menu-list-:rb:-menuitem-:rd:"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start z-auto items-center gap-1 px-3"
            }
            to="/wishlist"
          >
            <FaStar className="text-xl mr-3" />
            <span>Wishlist</span>
          </NavLink>
        </MenuList>
      </Menu>

      <div className="">
        <a
          href="/"
          className={`btn btn-ghost text-xl text-black`}
        >
          HA Blog
        </a>
      </div>
      <div className="flex gap-2">
        <div className=" hidden lg:flex">
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
                className="btn btn-outline !py-2 text-black    hover:text-white ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline !py-2 text-black    hover:text-white ml-2"
            >
              Login
            </Link>
          )}
        </div>

        <div className=" lg:hidden">
          {user ? (
            <Menu>
              <MenuButton
                variant="outline"
                className="!text-teal-600 !border !border-teal-600 !rounded-full"
              >
                <WrapItem>
                  <Avatar name={user?.displayName} src={user?.photoURL} />
                </WrapItem>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <span className="text-xl">User:</span> {user?.displayName}
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline !py-2 text-black    hover:text-white ml-2"
            >
              Login
            </Link>
          )}
        </div>
        <div>
          <input
            id="checkbox"
            type="checkbox"
            onChange={handleChange}
            checked={isChecked}
          />
          <label className="switch" htmlFor="checkbox">
            {isChecked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-moon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
