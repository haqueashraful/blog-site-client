import { Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
const EditBlog = () => {

  const {id} = useParams();
  console.log(id)
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = (data) => {
      // Handle form submission (e.g., send data to backend)
      console.log(data);
    };
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
 {/* title */}
 <div className="mb-4">
   <label htmlFor="title" className="block font-medium">Title</label>
   <Input type="text" id="title" {...register("title", { required: "Title is required" })} className="form-input mt-1 block w-full" />
   {errors.title && <span className="text-red-500">{errors.title.message}</span>}
 </div>

 {/* image */}
 <div className="mb-4">
   <label htmlFor="image_url" className="block font-medium">Image URL:</label>
   <Input type="text" id="image_url" {...register("image_url", { required: "Image URL is required" })} className="form-input mt-1 block w-full" />
   {errors.image_url && <span className="text-red-500">{errors.image_url.message}</span>}
 </div>


    {/* category */}
    <div className="mb-4">
   <label htmlFor="category" className="block font-medium">Category</label>
   <Select
     id="category"
     {...register("category", { required: "Category is required" })}
     options={[{ value: "technology", label: "Technology" }, { value: "food", label: "Food" }, { value: "travel", label: "Travel" }]} // Example categories
   />
   {errors.category && <span className="text-red-500">{errors.category.message}</span>}
 </div>
 {/* short description */}
 <div className="mb-4">
   <label htmlFor="short_description" className="block font-medium">Short Description</label>
   <Textarea
     id="short_description"
     {...register("short_description", { required: "short description is required" })}
     className="form-input mt-1 block w-full"
   />
   {errors.short_description && <span className="text-red-500">{errors.short_description.message}</span>}
 </div>
 {/* long description */}
 <div className="mb-4">
   <label htmlFor="long_description" className="block font-medium">Long Description</label>
   <Textarea
     id="long_description"
     {...register("long_description", { required: "Long Description is required" })}
     className="form-input mt-1 block w-full"
   />
   {errors.long_description && <span className="text-red-500">{errors.long_description.message}</span>}
 </div>
  {/* email */}
  {/* <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <Input
            disabled
            type="email"
            defaultValue={email} // Set the default value to user's email
            id="email"
            {...register("email")}
            className="form-input mt-1 block w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div> */}
 

 
 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
</form>
   </div>
    );
};

export default EditBlog;