import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RecentBlogCard from "./RecentBlogCard";
import Loading from "./Loading";
import { useContext } from "react";
import { Context } from "../Context/MyContext";

const RecentBlog = () => {

  const { isChecked } = useContext(Context);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recentBlog"],
    queryFn: async () => await axios.get("https://blog-site-server-lemon.vercel.app/blogs/recent", { withCredentials: true }).then((res) => res.data),
  });

  console.log(data)
  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No recent blogs found.</div>;
  }

  return (
    <>
      <div className="my-10">
        <h1 className={`text-3xl font-bold text-center ${isChecked ? "text-white" : "text-black"}`}>Recent Blog</h1>
        <p className="text-center text-xl text-teal-500 font-bold">Click on the Card to show Details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <RecentBlogCard key={item._id} item={item} data={data} />
        ))}
      </div>
    </>
  );
};

export default RecentBlog;
