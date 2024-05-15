import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import bg from "../assets/technology.jpg"

const Footer = () => {
    return (
        <div style={{backgroundImage: `url(${bg})`, backgroundAttachment: 'fixed', backgroundPosition: 'top', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className=" space-y-5">
         <div className="w-full bg-[#023A55]/60 py-9">
         <div className="py-4">
                <h1 className="text-center text-4xl font-bold text-white">HA Blog</h1>
            </div>
            <div>
                <ul className="flex justify-center gap-3">
                    <li className="bg-white p-2 rounded-full">
                   <a href=""> <FaFacebookF className="text-3xl text-black "/></a>
                    </li>
                    <li className="bg-white p-2 rounded-full">
                   <a href=""> <FaTwitter className="text-3xl text-black "/></a>
                    </li>
                    <li className="bg-white p-2 rounded-full">
                    <a href=""><FaLinkedin className="text-3xl text-black "/></a>
                    </li>
                    <li className="bg-white p-2 rounded-full">
                    <a href=""><IoMdMail className="text-3xl text-black "/></a>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="flex flex-col md:flex-row justify-center items-center py-2 gap-2 lg:gap-5 text-xl underline text-white">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/allblogs">All Blogs</Link>
                    </li>
                    <li>
                        <Link to="/featuredblog">featured</Link>
                    </li>
                    <li>
                        <Link to="/wishlist">WishList</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>

            <div className="py-3 border-t border-b border-white flex justify-center items-center">
                <p className="text-center text-white">Copyright © 2023. All rights reserved.</p>
            </div>
         </div>
        </div>
    );
};

export default Footer;