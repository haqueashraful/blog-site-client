import { useState, useEffect } from "react";
import axios from "axios";

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/featured-blogs").then((response) => {
      setFeaturedBlogs(response.data);
      console.log(response.data);
    })
  }, []);


  return (
    <div>
      <h2>Featured Blogs</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Blog Title</th>
            <th>Blog Owner</th>
            <th>Blog Owner Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {featuredBlogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>{blog.userName}</td>
              <td>
                <img
                  src={blog.userPhoto}
                  alt={`${blog.owner}'s Profile Picture`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedBlogs;
