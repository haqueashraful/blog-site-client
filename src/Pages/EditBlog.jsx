import { Input,  Select,  Textarea } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import editImage from "../assets/edit.svg";
import Loading from "../Component/Loading";
import bgImage1 from   "../assets/bg2.jpg"
import bgImage2 from   "../assets/bg5.jpg"
import { Context } from "../Context/MyContext";

const EditBlog = () => {
  const { id } = useParams();
  const {isChecked} = useContext(Context)
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

const updateBlog = useMutation({
 mutationFn: (data) => axios.patch(`https://blog-site-server-lemon.vercel.app/blogs/${id}`, data, { withCredentials: true })
 .then((res) => res.data),
 onSuccess: () => {
  toast.success("Blog updated successfully");
  navigate(`/blogdetails/${id}`);
 }
})

  const onSubmit = async (data) => {
   await updateBlog.mutate(data)

    console.log(data)
  };

  if(isLoading){
    return <Loading />
  }

  const checkedBg = isChecked ? bgImage1 : bgImage2


  return (
    <>

    <div className="text-center">
      <h1    style={{backgroundImage: `url(${checkedBg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className={`text-3xl ${isChecked ? 'text-white' : 'text-black'} font-bold text-center my-5 border py-5 rounded-md`}>Edit Blog</h1>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5 justify-center items-center">
        <div className="w-full h-full border">
          <img className="w-full h-full object-cover" src={editImage} alt="" />
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl border p-2 rounded-md mx-auto w-full">
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
    </>
  );
};

export default EditBlog;
