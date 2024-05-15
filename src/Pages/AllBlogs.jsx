import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBar from "../Component/SearchBar";
import BlogList from "../Component/BlogList";
import SelectItem from "../Component/SelectItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Component/Loading";
import bgImage1 from   "../assets/bg2.jpg"
import bgImage2 from   "../assets/bg5.jpg"
import { Context } from "../Context/MyContext";

const AllBlogs = () => {
  const {isChecked} = useContext(Context)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const checkedBg = isChecked ? bgImage1 : bgImage2


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

  if (isPending) {
    return <div><Loading /></div>;
  }
  return (
    <div>
      <h1   style={{backgroundImage: `url(${checkedBg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className={`text-3xl ${isChecked ? 'text-white' : 'text-black'} font-bold text-center my-5 border py-5 rounded-md`}>All Blogs</h1>
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
