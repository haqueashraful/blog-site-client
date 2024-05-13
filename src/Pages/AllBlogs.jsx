import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../Component/SearchBar";
import BlogList from "../Component/BlogList";
import SelectItem from "../Component/SelectItem";
import { useQuery } from "@tanstack/react-query";

const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  let url = `http://localhost:5000/blogs`;
  useEffect(() => {
    if (search || selectedCategory) {
      url += `?search=${search || ""}&category=${
        selectedCategory ? selectedCategory.value || "" : ""
      }`;
    }
  }, [search, selectedCategory]);

  const { data } = useQuery({
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
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">All Blogs</h1>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4 items-center">
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
