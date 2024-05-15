import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/MyContext";
import { useQuery } from "@tanstack/react-query";

const RecentBlogCard = ({ item }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { handleAddToWishlist, user, handleRemoveWishlist } = useContext(Context);

  const navigate = useNavigate();

  const getWishlist = async () => {
    const response = await axios.get(
      `https://blog-site-server-lemon.vercel.app/wishlist/${user.email}`,
      { withCredentials: true }
    );
    return response.data;
  };

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: getWishlist,
  });

  useEffect(() => {
    if (wishlistData) {
      setWishlist(wishlistData);
    }
  }, [wishlistData]);

  const handleDetails = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  const handleAddToWishlistButton = () => {
    const isInWishlist = wishlist.find((wishlistItem) => wishlistItem._id === selectedId);
    if (isInWishlist) {
      handleRemoveWishlist(selectedId);
      setWishlist(wishlist.filter((wishlistItem) => wishlistItem._id !== selectedId));
    } else {
      handleAddToWishlist(item);
      setWishlist([...wishlist, item]);
    }
  };


  return (
    <>
      <motion.div
        className="flex flex-col gap-3 p-2 border bg-secondary/10 rounded-md"
        key={item._id}
        layoutId={item._id}
        onClick={() => setSelectedId(item._id)}
      >
        <motion.img src={item.image_url} alt={item.title} />
        <motion.h1 className="text-lg  text-center w-1/3 bg-secondary px-3 py-1 rounded-l-full rounded-r-full">
          {item.category}
        </motion.h1>
        <motion.h2 className="text-lg font-bold">{item.title}</motion.h2>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            key={selectedId}
            layoutId={selectedId}
            style={{
              width: "100%",
              height: "100%",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(100%, 100%, 100%, 0.9)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "80%",
                position: "relative",
                maxWidth: "400px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <img
                className="mb-4 w-full h-[150px]"
                src={item.image_url}
                alt={item.title}
                style={{ width: "100%", height: "150px" }}
              />
              <h2 className="text-xl font-semibold mb-2">
                {item.title}
              </h2>
              <h2 className="text-lg font-bold mb-2 text-secondary">
                <span className="text-black font-normal">Category:</span>
                {item.category}
              </h2>
              <h5>
                {item.short_description}
              </h5>

              <button
                className="bg-red-500 text-white py-2 px-4 rounded-full absolute -top-[3%] -right-[3%]"
                onClick={() => setSelectedId(null)}
              >
                X
              </button>
              <motion.div>
                <motion.button
                  onClick={handleAddToWishlistButton}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md"
                >
                  {wishlist.find((wishlistItem) => wishlistItem._id === selectedId)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </motion.button>

                <motion.button
                  className="bg-blue-500 text-white py-1 px-4 rounded-md ml-4"
                  onClick={() => handleDetails(selectedId)}
                >
                  Details
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentBlogCard;
