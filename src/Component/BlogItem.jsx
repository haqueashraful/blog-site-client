import { useContext } from "react";
import { Context, MyContext } from "../Context/MyContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogItem = ({ blog }) => {
  const { handleAddToWishlist } = useContext(Context); 

  const {_id, title, image_url, long_description, short_description, category } = blog;
  const navigate = useNavigate();
    const handleDetails = (id) => {
      navigate(`/blogdetails/${id}`);
    }
  return (

    <motion.div className="bg-white rounded-lg shadow-md p-4 mb-4" 
    initial={{ scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 360,
      damping: 20
    }}>
      <motion.img
        src={image_url}
        alt={title}
        className="w-full h-40 object-cover mb-4"
      />
      <motion.div className="mb-4 flex justify-between">
        <motion.h2 className="text-lg font-semibold mb-2">{title}</motion.h2>
        <motion.p className="text-xs text-gray-500 mb-2">{category}</motion.p>
      </motion.div>
      <motion.p className="text-sm text-gray-600 mb-2">{short_description}</motion.p>
      <motion.p className="text-xs text-gray-500"> {long_description}</motion.p>
      <motion.div>
        <motion.button
          onClick={() => handleAddToWishlist(_id)}
          className="bg-blue-500 text-white py-1 px-4 rounded-md"
        >
          Add to Wishlist
        </motion.button>

        <motion.button
          className="bg-blue-500 text-white py-1 px-4 rounded-md ml-4"
          onClick={() => handleDetails(_id)}
        >
          Details
        </motion.button>
      </motion.div>
    </motion.div>



  );
};

export default BlogItem;
