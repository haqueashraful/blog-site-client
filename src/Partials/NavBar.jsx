import { useContext } from "react";
import { Context } from "../Context/MyContext";
import { Link, NavLink } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
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
    <div className="flex justify-between items-center py-1 bg-white rounded-l-full rounded-r-full my-3 border px-5 shadow-md">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<RxHamburgerMenu />}
          variant="outline"
          className="!text-teal-600 !border !border-teal-600 !rounded-full"
        />
        <MenuList className="space-y-2">
          <NavLink
            type="button"
            className={({ isActive }) =>
              isActive
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start items-center gap-1 px-3"
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
                ? "!bg-teal-500 !text-white  flex justify-start items-center gap-1 px-3 py-1"
                : " flex justify-start items-center gap-1 px-3"
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
                : " flex justify-start items-center gap-1 px-3"
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
                : " flex justify-start items-center gap-1 px-3"
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
                : " flex justify-start items-center gap-1 px-3"
            }
            to="/wishlist"
          >
            <FaStar className="text-xl mr-3" />
            <span>Wishlist</span>
          </NavLink>
        </MenuList>
      </Menu>

      <div className="">
      <a className={`btn btn-ghost text-xl ${isChecked ? "text-secondary" : ""}`}>HA Blog</a>
      </div>
      <div className="flex gap-2">
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
              className="btn btn-outline !outline-teal-500 hover:bg-secondary !py-2  hover:text-white ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline btn-success !py-2 hover:!bg-green-300"
          >
            Login
          </Link>
        )}

        <div>
          <input id="checkbox" type="checkbox" onChange={handleChange} checked={isChecked} />
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
