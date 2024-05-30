import { useState, useContext, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { MdOutlineEditOff } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Context } from "../Context/MyContext";
import { CiEdit } from "react-icons/ci";

const ReplyCard = ({ reply, commentId, setUpdateComment }) => {
  const { _id, replyText, userName, userPhoto, userEmail } = reply;
  const { user } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(replyText);
  const [replyId, setReplyId] = useState(_id);


  useEffect(() => {
    setReplyId(_id);
  }, [_id, isEditing,editedReply]);

  const queryClient = useQueryClient();
    // const replyId = reply._id;
  const replyUrl = `https://blog-site-server-lemon.vercel.app/comments/${commentId}/replies/${_id}`
  const updateReply = useMutation({
    mutationFn: async (data) => {
      await axios.patch(
        replyUrl,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Reply updated successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    if (editedReply !== replyText) {
      setEditedReply(replyText);
    }
    setIsEditing(false);
  };

  const handleSendClick = async () => {
    setIsEditing(false);
    updateReply.mutate({ replyText: editedReply });

};

  

  const deleteReply = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `https://blog-site-server-lemon.vercel.app/comments/${commentId}/replies/${_id}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Reply deleted successfully");
      setUpdateComment((prev) => !prev);
      queryClient.invalidateQueries(["commentsData"]);
    },
  });

  const handleDelete = async () => {
    await deleteReply.mutate();
  };

  return (
    <div className="flex flex-col gap-4 border w-full px-3 py-2 rounded-md bg-gray-100 mt-2">
      <div className="flex items-center gap-3">
        <img className="w-8 h-8 rounded-full" src={userPhoto} alt="" />
        <h1 className="text-md font-bold">{userName}</h1>
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
      <div className="pl-10">
        {isEditing ? (
          <div
            className="p-2 border rounded-md focus:outline-none"
            contentEditable="true"
            onBlur={(e) => setEditedReply(e.target.textContent)}
          >
            {editedReply}
          </div>
        ) : (
          <p>{replyText}</p>
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

export default ReplyCard;
