import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Padding } from "@mui/icons-material";

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/featured-blogs")
      .then((response) => {
        setFeaturedBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(featuredBlogs);


  const columns = [
    {
      name : "Serial",
      selector: (row, index) => index + 1,
    },
    {
      name: 'Title',
      selector: row => <h1>{row.title}</h1>,
    },
    {
      name: 'Blog Owner',
      selector: row => <h1>{row.userName}</h1>,
    },
    {
      name: 'Image',
      selector: row => <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} className="my-2" src={row.userPhoto} alt="" />,
    },
    {
      name: 'Action',
      cell: row => <Button  colorScheme='teal' variant='link' onClick={() => navigate(`/blogdetails/${row._id}`)} className="bg-transparent">View Details</Button>,
    }
  ];


  return (
    <div>
      <h2>Featured Blogs</h2>
      <DataTable data={featuredBlogs} columns={columns} />
    </div>
  );
};

export default FeaturedBlogs;
