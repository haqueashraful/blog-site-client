import { useQuery } from "@tanstack/react-query";
import BlogItem from "./BlogItem";

const BlogList = ({blogs}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
