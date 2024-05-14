import { useState, useContext } from "react";
import { Context } from "../Context/MyContext";
import { Button } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEditOff } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const CommentCard = ({ comment, setUpdateComment }) => {
  const { _id, commentText, userName, userPhoto, userEmail } = comment;
  const { user, loader } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);

  const queryClient = useQueryClient();

  const updatedComment = useMutation(
 {
  mutationFn: async (data) => {
    await axios.patch(
      `https://blog-site-server-lemon.vercel.app/comments/${_id}`,
      data,
      { withCredentials: true }
    );
  },
    onSuccess: () => {
      toast.success("Comment updated successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  },
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    if (editedComment !== commentText) {
      setEditedComment(commentText);
    }
    setIsEditing(false);
  };

  const handleSendClick = async () => {
    console.log(editedComment)
    await updatedComment.mutate({ commentText: editedComment }); 
    setIsEditing(false);
  };

  const deletedComment = useMutation({
    mutationFn: async () => {
      await axios.delete(`https://blog-site-server-lemon.vercel.app/comments/${_id}`, { withCredentials: true })
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  })

  const handleDelete = async () => {
    await deletedComment.mutate()
  }

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
<div className={`flex flex-col gap-4 border w-full px-3 py-2 rounded-md  `}>
      <div className={`flex items-center gap-3 `}>
        <img className="w-10 h-10 rounded-full" src={userPhoto} alt="" />
        <h1 className="text-lg font-bold">{userName}</h1>
        {user?.email === userEmail && (
          <div className="ml-auto flex gap-3">
            <Button onClick={handleDelete}>
            <FaTrash />
            </Button>
            <Button onClick={isEditing ? handleCancelClick : handleEditClick}>
              {isEditing ? <MdOutlineEditOff /> : <CiEdit />}
            </Button>
          </div>
        )}
      </div>
      <div className="pl-12">
        {isEditing ? (
          <div
            className="p-2 border rounded-md focus:outline-none"
            contentEditable="true"
            onBlur={(e) => setEditedComment(e.target.textContent)}
          >
            {editedComment}
          </div>
        ) : (
          <p>{commentText}</p>
        )}
      </div>
      {isEditing && (
        <Button onClick={handleSendClick} className="ml-auto">
          <LuSend />
        </Button>
      )}
    </div>
  );
};

export default CommentCard;
