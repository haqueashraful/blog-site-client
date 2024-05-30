import { useState, useContext } from "react";
import { Context } from "../Context/MyContext";
import { Button } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEditOff } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ReplyCard from "./ReplayCard";

const CommentCard = ({ comment, setUpdateComment }) => {
  const { _id, commentText, userName, userPhoto, userEmail, replies = [] } = comment;
  const { user, loader } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const updatedComment = useMutation({
    mutationFn: async (data) => {
      await axios.patch(`http://localhost:5000/comments/${_id}`, data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Comment updated successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  });

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
    await updatedComment.mutate({ commentText: editedComment });
    setIsEditing(false);
  };

  const deletedComment = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:5000/comments/${_id}`, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  });

  const handleDelete = async () => {
    await deletedComment.mutate();
  };

  const addReply = useMutation({
    mutationFn: async (replyData) => {
      await axios.post(`http://localhost:5000/comments/${_id}/replies`, replyData, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Reply added successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  });

  const handleReplies = async (e) => {
    e.preventDefault();
    const replyText = e.target.reply.value;
    const data = {
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      userEmail: user?.email,
      replyText,
    };

    await addReply.mutate(data);
    setIsOpen(false);
  };

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border w-full px-3 py-2 rounded-md bg-white/40">
        <div className="flex items-center gap-3">
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
      <div className="ml-[5%]">
        <button onClick={() => setIsOpen(!isOpen)}>Reply</button>
      </div>

      {isOpen && (
        <form className="ml-[5%]" onSubmit={handleReplies}>
          <input
            name="reply"
            type="text"
            className="p-2 border rounded-md focus:outline-none"
          />
          <Button type="submit" className="ml-auto">
            <LuSend />
          </Button>
        </form>
      )}

      {replies.length > 0 && (
        <div className="ml-[10%]">
          {replies.map((reply) => (
            <ReplyCard
              key={reply._id}
              reply={reply}
              commentId={_id}
              setUpdateComment={setUpdateComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
