import { Input, Select, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  
  const fetchData = () =>{
    axios
    .get(`https://blog-site-server-lemon.vercel.app/blogs/id/${id}`, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
  }

  const {data = {}, isLoading} = useQuery(
    {
      queryKey: ["blog", id],
      queryFn: () => axios.get(`https://blog-site-server-lemon.vercel.app/blogs/id/${id}`, { withCredentials: true }).then((res) => res.data),
    }
  )

useEffect(() => {
  const {
    title,
    image_url,
    short_description,
    long_description,
    category,
  } = data;
  setValue("title", title);
  setValue("image_url", image_url);
  setValue("short_description", short_description);
  setValue("long_description", long_description);
  setValue("category", category);
}, [data]);

const {mutateAsync} = useMutation({
 mutationFn: (data) => axios.patch(`https://blog-site-server-lemon.vercel.app/blogs/${id}`, data, { withCredentials: true }),
 onSuccess: () => {
  toast.success("Blog updated successfully");
  navigate(`/blogdetails/${id}`);
 }
})

  const onSubmit = (data) => {
   mutateAsync(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <Input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="form-input mt-1 block w-full"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image_url" className="block font-medium">
            Image URL:
          </label>
          <Input
            type="text"
            id="image_url"
            {...register("image_url", { required: "Image URL is required" })}
            className="form-input mt-1 block w-full"
          />
          {errors.image_url && (
            <span className="text-red-500">{errors.image_url.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <Select {...register("category")}>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
          </Select>
        </div>

        <div className="mb-4">
          <label htmlFor="short_description" className="block font-medium">
            Short Description
          </label>
          <Textarea
            id="short_description"
            {...register("short_description", {
              required: "Short Description is required",
            })}
            className="form-input mt-1 block w-full"
          />
          {errors.short_description && (
            <span className="text-red-500">
              {errors.short_description.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="long_description" className="block font-medium">
            Long Description
          </label>
          <Textarea
            id="long_description"
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

export default EditBlog;
