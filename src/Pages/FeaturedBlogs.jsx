import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Loading from "../Component/Loading";
import { useQuery } from "@tanstack/react-query";

const FeaturedBlogs = () => {
  const navigate = useNavigate();

  const { data: featuredBlogs = [], isLoading } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: () =>
      axios
        .get("https://blog-site-server-lemon.vercel.app/featured-blogs")
        .then((res) => res.data),
  });

  console.log(featuredBlogs);

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
    },
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
      <h2 className="text-3xl font-bold text-center my-5 border py-10  ">
        Featured Blogs
      </h2>
      <DataTable
        data={featuredBlogs}
        columns={columns}
        customStyles={customStyle}
      />
    </div>
  );
};

export default FeaturedBlogs;
