import { Avatar, Button, Textarea, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context/MyContext";
import CommentCard from "../Component/CommentCard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PhotoProvider, PhotoView } from "react-photo-view";

const BlogDetails = () => {
  const { user, loader, } = useContext(Context);
  const { id } = useParams();
  // const [data, setData] = useState({});
  // const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () =>
      axios
        .get(`https://blog-site-server-lemon.vercel.app/blogs/id/${id}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["commentsData", id, showComments, updateComment],
    queryFn: () =>
      axios
        .get(`https://blog-site-server-lemon.vercel.app/comments/${id}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

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

  const { mutateAsync: mutate } = useMutation({
    mutationFn: (data) =>
      axios
        .post(`https://blog-site-server-lemon.vercel.app/comments/`, data, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Comment added successfully");
          setUpdateComment((prev) => !prev);
        }),
  });

  const onSubmit = (data, event) => {
    event.preventDefault();
    reset();
    const commentData = {
      blogId: _id,
      commentText: data.comment,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
    };
    mutate(commentData);
  };

  const deletedBLog = useMutation({
    mutationFn: () =>
      axios
        .delete(`https://blog-site-server-lemon.vercel.app/blogs/${id}`, {
          withCredentials: true,
        })
        .then(() => {}),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      navigate("/allblogs");
    },
  });

  const handleDelete = () => {
    deletedBLog.mutateAsync();
  };

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <PhotoProvider>
      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Blog Details */}
        <motion.div className="w-full lg:relative">
        <motion.div className=" w-full   lg:sticky top-0 ">
          <motion.div className="w-full p-2 border rounded-md overflow-hidden">
            <PhotoView src={image_url}>
              <motion.img
                className="w-full h-52 rounded-sm"
                src={image_url}
                alt={title}
              />
            </PhotoView>
            <motion.div className="w-full p-2 space-y-3">
              <motion.h1 className="text-3xl font-bold">{title}</motion.h1>
              <motion.span className="text-lg font-semibold">
                Category: {category}
              </motion.span>
              <motion.p>{short_description}</motion.p>
              <motion.p>{long_description}</motion.p>
            </motion.div>
          </motion.div>
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
          <motion.div className="comment-form flex w-full gap-2 my-5">
            <WrapItem>
              <Avatar name={user?.displayName} src={user?.photoURL} />
            </WrapItem>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                className="mb-2 w-full"
                {...register("comment", { required: "Comment is required" })}
                placeholder="Enter your comment"
              />
              {errors.comment && <div>{errors.comment.message}</div>}
              <Button className="block" type="submit">
                Submit
              </Button>
            </form>
          </motion.div>
        </motion.div>
        </motion.div>
        {/* Comments */}
        <motion.div className=" w-full flex flex-col gap-2">
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              setUpdateComment={setUpdateComment}
            ></CommentCard>
          ))}
        </motion.div>
      </motion.div>
    </PhotoProvider>
  );
};

export default BlogDetails;
