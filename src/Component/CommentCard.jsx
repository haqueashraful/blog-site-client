const CommentCard = ({ comment }) => {
  const { _id, commentText, userName, userPhoto } = comment;
  return (
    <div>
      <div>
        <img src={userPhoto} alt="" />
        <h1>{userName}</h1>
      </div>
      <div>
        <p>{commentText}</p>
      </div>
    </div>
  );
};

export default CommentCard;
