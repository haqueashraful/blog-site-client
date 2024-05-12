import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import RecentBlogCard from "./RecentBlogCard";

const RecentBlog = () => {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs?recent=true").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <RecentBlogCard key={item._id} item={item} data={data}/>
        ))}
      </div>

    </>
  );
};

export default RecentBlog;
