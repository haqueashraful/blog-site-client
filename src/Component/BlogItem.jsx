import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/MyContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const BlogItem = ({ blog }) => {
  const { handleAddToWishlist, user, stateLoader, loader } = useContext(Context);
  const navigate = useNavigate();
  const [trueEmail, setTrueEmail] = useState(false);

  const {
    _id,
    title,
    image_url,
    email,
    long_description,
    short_description,
    category,
  } = blog;

  const handleDetails = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  useEffect(() => {
    if (user?.email === blog.email) {
      setTrueEmail(true);
    }
  }, [blog.email]);

  const handleDelete = (id) => {
    console.log(id);
  };

  if (loader) {
    return <div>Loading...</div>;
  }
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 mb-4"
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
        <motion.h2 className="text-lg font-semibold mb-2">{title}</motion.h2>
        <motion.p className="text-xs text-gray-500 mb-2">{category}</motion.p>
      </motion.div>
      <motion.p className="text-sm text-gray-600 mb-2">
        {short_description}
      </motion.p>
      <motion.p className="text-xs text-gray-500"> {long_description}</motion.p>
      <motion.div className="w-full flex justify-between mt-5">
        <motion.button
          onClick={() => handleAddToWishlist(_id)}
          className="bg-teal-500 text-white py-1 px-4 rounded-md"
        >
          Add to Wishlist
        </motion.button>

        <motion.button
          className="bg-teal-500 text-white py-1 px-4 rounded-md ml-4"
          onClick={() => handleDetails(_id)}
        >
          Details
        </motion.button>
      </motion.div>
      <motion.div className="w-full mt-5">
      {user?.email === email && (
          <motion.div className="w-full flex justify-between" >
            <motion.button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md ml-4"
            >
             <FaRegTrashAlt />

            </motion.button>
            <motion.button
              onClick={() => navigate(`/editblog/${_id}`)}
              className="bg-blue-500 text-white text-xl py-2 px-4 rounded-md mr-4"
            >
              <CiEdit />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BlogItem;
