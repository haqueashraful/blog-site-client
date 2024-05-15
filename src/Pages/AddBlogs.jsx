import { useContext, useState } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Context } from "../Context/MyContext";
import addImg from '../assets/add.svg'
import bgImage1 from   "../assets/bg2.jpg"
import bgImage2 from   "../assets/bg5.jpg"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlogs = () => {
  const { user, isChecked } = useContext(Context);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSubmit = (data) => {
    // Add the selected category to the data object
    data.category = selectedCategory?.value;
    data.email = user?.email;
    data.userName = user?.displayName;
    data.userPhoto = user?.photoURL;
  
    const currentDate = new Date();
    const localDateTime = currentDate.toString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM" (example)
    data.createdTime = localDateTime;
  
    axios.post("https://blog-site-server-lemon.vercel.app/blogs", data).then((res) => {
      reset();
      navigate("/");
      toast.success("Blog Added Successfully");
    });
  };
  
  const checkedBg = isChecked ? bgImage1 : bgImage2

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setValue("category", selectedOption?.value);
  };

  return (
    <>
    <div>
      <h1   style={{backgroundImage: `url(${checkedBg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className={`text-3xl ${isChecked ? 'text-white' : 'text-black'} font-bold text-center my-5 border py-5 rounded-md`}>Add New Blog</h1>
    </div>
    <div className="my-5  grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center">
      <div className="w-full h-full border">
      <img className="w-full h-full object-cover" src={addImg} alt="" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl border p-2 rounded-md  mx-auto w-full">
        {/* title */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <Input
            type="text"
            id="title"
            placeholder="Title of the blog"
            {...register("title", { required: "Title is required" })}
            className="form-input mt-1 block w-full !bg-white/60"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* image */}
        <div className="mb-4">
          <label htmlFor="image_url" className="block font-medium">
            Image URL:
          </label>
          <Input
            type="text"
            id="image_url"
            placeholder="Image URL"
            {...register("image_url", { required: "Image URL is required" })}
            className="form-input mt-1 block w-full !bg-white/60"
          />
          {errors.image_url && (
            <span className="text-red-500">{errors.image_url.message}</span>
          )}
        </div>

        {/* category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <Select
          className=" text-black"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={[
              { value: "technology", label: "Technology" },
              { value: "food", label: "Food" },
              { value: "travel", label: "Travel" },
            ]} // Example categories
          />
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>

        {/* short description */}
        <div className="mb-4">
          <label htmlFor="short_description" className="block font-medium">
            Short Description
          </label>
          <Textarea
            id="short_description"
            placeholder="Short description of the blog....."
            {...register("short_description", {
              required: "Short description is required",
            })}
            className="form-input mt-1 block w-full !bg-white/60"
          />
          {errors.short_description && (
            <span className="text-red-500">
              {errors.short_description.message}
            </span>
          )}
        </div>

        {/* long description */}
        <div className="mb-4">
          <label htmlFor="long_description" className="block font-medium">
            Long Description
          </label>
          <Textarea
            id="long_description"
            placeholder="Long description of the blog......"
            {...register("long_description", {
              required: "Long Description is required",
            })}
            className="form-input mt-1 block w-full !bg-white/60"
          />
          {errors.long_description && (
            <span className="text-red-500">
              {errors.long_description.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddBlogs;
