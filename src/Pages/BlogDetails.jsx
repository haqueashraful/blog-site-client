import { Avatar, Button, Textarea, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/MyContext";
import CommentCard from "../Component/CommentCard";
import {motion} from 'framer-motion'
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BlogDetails = () => {
  const { user, loader } = useContext(Context);
  const { id } = useParams();
  // const [data, setData] = useState({});
  // const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const {data = {}, isLoading} = useQuery({
      queryKey: ["blogDetails", id],
      queryFn: () => axios.get(`https://blog-site-server-lemon.vercel.app/blogs/id/${id}`, { withCredentials: true }).then((res) => res.data),
    })


  // useEffect(() => {
  //   axios
  //     .get(`https://blog-site-server-lemon.vercel.app/comments/${id}`, { withCredentials: true })
  //     .then((res) => {
  //       setComments(res.data);
  //     });
  // }, [id, showComments, updateComment]);

  const {data: comments = []} = useQuery({
    queryKey: ["commentsData", id, showComments, updateComment],
    queryFn: () => axios.get(`https://blog-site-server-lemon.vercel.app/comments/${id}`, { withCredentials: true }).then((res) => res.data),
  })  
console.log(comments)

  const {
    _id,
    title,
    image_url,
    email,
    long_description,
    short_description,
    category,
  } = data;

  const isCurrentUserAuthor = user?.email === email;


  const onSubmit = (data, event) => {
    event.preventDefault(); 
    
    const commentData = {
      blogId: _id,
      commentText: data.comment,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
    };
  console.log(commentData)
    axios.post("https://blog-site-server-lemon.vercel.app/comments", commentData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setShowComments(true);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };
  
  const {mutateAsync} = useMutation({
      mutationFn: () => axios.delete(`https://blog-site-server-lemon.vercel.app/blogs/${id}`, { withCredentials: true }).then(() =>{
        toast.success("Blog deleted successfully");
        navigate("/allblogs")
      }),
  })

  const handleDelete =  () => {
    mutateAsync()

  };



  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full flex gap-2">
        {/* Blog Details */}
        <div className="w-1/2">
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
          {isCurrentUserAuthor && (
        <motion.div className="w-full flex justify-between mt-5">
          <motion.button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-4"
          >
            <FaRegTrashAlt />
          </motion.button>
          <motion.button
            onClick={() => navigate(`/editblog/${_id}`)}
            className="bg-blue-500 text-white text-xl py-2 px-4 rounded-md mr-4"
          >
            <CiEdit />
          </motion.button>
        </motion.div>
      )}
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
        <div className="w-1/2 flex flex-col gap-2">
          {
            comments.map((comment) => <CommentCard key={comment._id} comment={comment} setUpdateComment={setUpdateComment} ></CommentCard> )
          }
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
