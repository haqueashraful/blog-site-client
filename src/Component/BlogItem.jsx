import { useContext } from "react";
import { Context, MyContext } from "../Context/MyContext";
import { useNavigate } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const { handleAddToWishlist } = useContext(Context); 

  const {_id, title, image_url, long_description, short_description, category } =
    blog;
  const navigate = useNavigate();
    const handleDetails = (id) => {
      navigate(`/blogdetails/${id}`);
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <img
        src={image_url}
        alt={title}
        className="w-full h-40 object-cover mb-4"
      />
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-xs text-gray-500 mb-2">{category}</p>
      </div>
      <p className="text-sm text-gray-600 mb-2">{short_description}</p>
      <p className="text-xs text-gray-500"> {long_description}</p>
      <div>
        <button
          onClick={() => handleAddToWishlist(_id)}
          className="bg-blue-500 text-white py-1 px-4 rounded-md"
        >
          Add to Wishlist
        </button>

        <button
          className="bg-blue-500 text-white py-1 px-4 rounded-md ml-4"
          onClick={() => handleDetails(_id)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
