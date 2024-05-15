import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBar from "../Component/SearchBar";
import BlogList from "../Component/BlogList";
import SelectItem from "../Component/SelectItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Component/Loading";
import bgImage1 from "../assets/bg2.jpg";
import bgImage2 from "../assets/bg5.jpg";
import { Context } from "../Context/MyContext";
import Pagination from "../Component/Pagination";

const AllBlogs = () => {
  const { isChecked } = useContext(Context);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [limit, setLimit] = useState(6);

  const checkedBg = isChecked ? bgImage1 : bgImage2;

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  const url = `https://blog-site-server-lemon.vercel.app/blogs?search=${search || ""}&category=${
    selectedCategory ? selectedCategory.value || "" : ""
  }&skip=${(page - 1) * limit}&limit=${limit}`;

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", search, selectedCategory, page, limit],
    queryFn: () =>
      axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => console.error("Error fetching blogs:", error)),
  });

  const totalUrl = `https://blog-site-server-lemon.vercel.app/totalcount?search=${
    search || ""
  }&category=${selectedCategory ? selectedCategory.value || "" : ""}`;

  const getCount = async () => {
    return await axios
      .get(totalUrl)
      .then((res) => res.data.result);
  }

  const { data: totalCount } = useQuery({
    queryKey: ["totalpages", search || "", selectedCategory?.value || ""],
    queryFn: () => getCount()
  });
  
  useEffect(() => {
    const totalPages = Math.ceil(totalCount / limit);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    setTotalPages(pagesArray);
  }, [totalCount, limit]);
  

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1
        style={{
          backgroundImage: `url(${checkedBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={`text-3xl ${
          isChecked ? "text-white" : "text-black"
        } font-bold text-center my-5 border py-5 rounded-md`}
      >
        All Blogs
      </h1>
      <div className="flex flex-col lg:flex-row w-full items-center justify-between">
        <div className="flex gap-4 items-center my-3">
          <span className="text-xl">Filter:</span>
          <SelectItem
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? <Loading /> : <BlogList blogs={data} />}
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AllBlogs;
