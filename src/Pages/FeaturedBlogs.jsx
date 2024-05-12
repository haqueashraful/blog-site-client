import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from '@tanstack/react-table'; // Import Table component

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
      <Table
        data={featuredBlogs}
        columns={[
          { Header: 'Serial Number', accessor: (row, index) => index + 1 },
          { Header: 'Blog Title', accessor: 'title' },
          { Header: 'Blog Owner', accessor: 'userName' },
          {
            Header: 'Blog Owner Profile Picture',
            accessor: 'userPhoto',
            Cell: ({ value }) => <img src={value} alt="Profile Picture" style={{ width: "50px", height: "50px" }} />,
          },
        ]}
      />
    </div>
  );
};

export default FeaturedBlogs;
