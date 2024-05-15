import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/MyContext";
import axios from "axios";

const BlogItem = ({ blog }) => {
  const { handleAddToWishlist, handleRemoveWishlist, user, isChecked } = useContext(Context);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistState, setWishlistState] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`https://blog-site-server-lemon.vercel.app/wishlist/${user.email}`);
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [wishlistState, user?.email]);

  const {
    _id,
    title,
    image_url,
    email,
    long_description,
    short_description,
    category,
  } = blog;

  const handleDetails = () => {
    navigate(`/blogdetails/${_id}`);
  };


  const handleAddToWishlistButton = () => {
    const isInWishlist = wishlist.find((item) => item._id === _id);
    if (isInWishlist) {
      handleRemoveWishlist(_id);
      setWishlistState(true);
    } else {
      handleAddToWishlist( blog );
      setWishlistState(true);
    }
  };




  return (
    <motion.div
      className="bg-secondary/10 rounded-lg shadow-md p-4 mb-4"
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 20,
      }}
    >
      <motion.img
        src={image_url}
        alt={title}
        className="w-full h-40 object-cover mb-4"
      />

      <motion.div className="mb-4 flex justify-between">
        <motion.h2 className="text-lg font-semibold  mb-2">{title}</motion.h2>
        <motion.p className="text-xs mb-2">{category}</motion.p>
      </motion.div>
      <motion.p className="text-sm  mb-2">
        {short_description}
      </motion.p>
      <motion.div className="w-full flex justify-between mt-5">
        <motion.button
                  onClick={handleAddToWishlistButton}
                  className="bg-teal-500 text-white py-1 px-4 rounded-md"
                >
                      {wishlist.find((item) => item._id === _id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </motion.button>
        <motion.button
          className="bg-teal-500 text-white py-1 px-4 rounded-md ml-4"
          onClick={handleDetails}
        >
          Details
        </motion.button>
      </motion.div>
    
    </motion.div>
  );
};

export default BlogItem;
