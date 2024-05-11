import { Avatar, Button, Textarea, WrapItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/id/${id}`).then((res) => {
      setData(res.data);
    })
  }, [id]);

  console.log(data);

  const {_id, title, image_url, long_description, short_description, category } = data;


  console.log(id);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="w-full flex gap-2">
        {/* Blog Details */}
        <div className="w-full">
          <div>
            <img src={image_url} alt={title} />
            <h1>{title}</h1>
            <p>{short_description}</p>
            <p>{long_description}</p>
            <span>Category: {category}</span>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <div className="comment-form flex w-full gap-2">
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                className="mb-2"
                {...register("comment", { required: "Comment is required" })}
                placeholder="Enter your comment"
              />
              {errors.comment && <div>{errors.comment.message}</div>}
              <Button className="block" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* Comments */}
        <div className="w-full">
          <h1>Comments</h1>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
