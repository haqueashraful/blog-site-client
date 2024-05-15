import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button, useColorMode } from "@chakra-ui/react";
import Loading from "../Component/Loading";
import { useQuery } from "@tanstack/react-query";
import bgImage1 from   "../assets/bg2.jpg"
import bgImage2 from   "../assets/bg5.jpg"
import { Context } from "../Context/MyContext";
import { Padding } from "@mui/icons-material";

const FeaturedBlogs = () => {
  const navigate = useNavigate();
  const {isChecked} = useContext(Context)

  const { data: featuredBlogs = [], isLoading } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: () =>
      axios
        .get("https://blog-site-server-lemon.vercel.app/featured-blogs")
        .then((res) => res.data),
  });


  const columns = [
    {
      name: "Serial",
      selector: (row, index) => index + 1,
    },
    {
      name: "Title",
      selector: (row) => <h1>{row.title}</h1>,
    },
    {
      name: "Blog Owner",
      selector: (row) => <h1>{row.userName}</h1>,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          className="my-2"
          src={row.userPhoto}
          alt=""
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          colorScheme="teal"
          variant="link"
          onClick={() => navigate(`/blogdetails/${row._id}`)}
          className="bg-transparent"
        >
          View Details
        </Button>
      ),
    },
  ];

  const checkedBg = isChecked ? bgImage1 : bgImage2

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#D9D9D9",
      },
    },
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        fontSize: "18px",
      },
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className=" my-10">
      <h2  style={{backgroundImage: `url(${checkedBg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className={`text-3xl ${isChecked ? 'text-white' : 'text-black'} font-bold text-center my-5 border py-5 rounded-md`}>
        Featured Blogs
      </h2>
      <DataTable
      className="!bg-white/40"
        data={featuredBlogs}
        columns={columns}
        customStyles={customStyle}
      />
    </div>
  );
};

export default FeaturedBlogs;
