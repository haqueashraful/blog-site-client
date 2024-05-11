import { useContext, useState } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Context } from "../Context/MyContext";

const AddBlogs = () => {
  const { user } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSubmit = (data) => {
    // Add the selected category to the data object
    data.category = selectedCategory?.value;
    data.email = user?.email;
    data.userName = user?.displayName;
    data.userPhoto = user?.photoURL;
    // Handle form submission (e.g., send data to backend)
    console.log(data);
    axios.post("http://localhost:5000/blogs", data).then((res) => {
      console.log(res.data);
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setValue("category", selectedOption?.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
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
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={[
              { value: "tech", label: "Technology" },
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
            className="form-input mt-1 block w-full"
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
            className="form-input mt-1 block w-full"
          />
          {errors.long_description && (
            <span className="text-red-500">
              {errors.long_description.message}
            </span>
          )}
        </div>

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <Input
            disabled
            type="email"
            defaultValue={user?.email} // Set the default value to user's email
            id="email"
            {...register("email")}
            className="form-input mt-1 block w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
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
  );
};

export default AddBlogs;
