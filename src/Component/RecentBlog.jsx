import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RecentBlog = () => {
  // const fetchTodoList = async () => {
  //   const blogs = axios.get(`http://localhost:5000/blogs?recent=true`)
  //   .then((res) => {

  //   });
  //   return blogs;
  // };
  // const { data  } = useQuery({ queryKey: ["blogs"], queryFn: fetchTodoList });

  // console.log("info", data);

  const { data, isLoading } = useQuery({
    queryKey: ["RecentBlogs"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/blogs?recent=true`)
       return res.data;
    },
  });

  console.log(data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
    <h1>Recent Blog</h1>
  </div>
  );
};

export default RecentBlog;
