import { Avatar, Button, Textarea, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Context } from "../Context/MyContext";
import CommentCard from "../Component/CommentCard";

const BlogDetails = () => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/id/${id}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${id}`, { withCredentials: true })
      .then((res) => {
        setComments(res.data);
      });
  }, [id]);


  const {
    _id,
    title,
    image_url,
    long_description,
    short_description,
    category,
  } = data;

  const onSubmit = (data, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const commentData = {
      blogId: _id,
      commentText: data.comment,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
    };
  console.log(commentData)
    axios.post("http://localhost:5000/comments", commentData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
        // Handle the error appropriately (e.g., display an error message to the user)
      });
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
              <Avatar name={user?.displayName} src={user?.photoURL} />
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
          {
            comments.map((comment) => <CommentCard key={comment._id} comment={comment} ></CommentCard> )
          }
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
