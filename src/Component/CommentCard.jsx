import { useState, useContext } from "react";
import { Context } from "../Context/MyContext";
import { Button } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEditOff } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import axios from "axios";

const CommentCard = ({ comment, setUpdateComment }) => {
  const { _id, commentText, userName, userPhoto, userEmail } = comment;
  const { user, loader } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);
  const [editButtonText, setEditButtonText] = useState("Edit");


  if (loader) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // setEditButtonText(isEditing ? "Edit" : "Cancel");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // setEditButtonText("Edit");
    setEditedComment(commentText);
  };

  const handleSendClick = () => {
    console.log("Updated Comment:", editedComment);
    axios
      .patch(`http://localhost:5000/comments/${_id}`, { commentText: editedComment }, {
        withCredentials: true,
      })
      .then((res) => {
        setUpdateComment(true);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
        // Handle error here
      });
    setIsEditing(false);
  };
  
  return (
    <div className="flex flex-col gap-4 border w-full px-3 py-2 rounded-md">
      <div className="flex items-center gap-3">
        <img className="w-10 h-10 rounded-full" src={userPhoto} alt="" />
        <h1 className="text-lg text-black font-bold">{userName}</h1>

        {user?.email === userEmail && (
          <div className="ml-auto">
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
