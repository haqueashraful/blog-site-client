import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../Component/SearchBar";
import BlogList from "../Component/BlogList";
import SelectItem from "../Component/SelectItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Component/Loading";

const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  let url = `https://blog-site-server-lemon.vercel.app/blogs`;
  useEffect(() => {
    if (search || selectedCategory) {
      url += `?search=${search || ""}&category=${
        selectedCategory ? selectedCategory.value || "" : ""
      }`;
    }
  }, [search, selectedCategory]);

  const { data, isPending } = useQuery({
    queryKey: ["blogs", search, selectedCategory],
    queryFn: () =>
      axios
        .get(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => console.error("Error fetching blogs:", error)),
  });

  console.log(data);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSearch = (text) => {
    setSearch(text);
    console.log(text);
  };

  // if (isPending) {
  //   return <div><Loading /></div>;
  // }
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">All Blogs</h1>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4 items-center my-3">
          <span className="text-xl">Filter:</span>
          <SelectItem
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <BlogList blogs={data} />
    </div>
  );
};

export default AllBlogs;
