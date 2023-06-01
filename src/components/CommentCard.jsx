import { convertDate } from "../../utils/convertDate";

const CommentCard = ({ id, review_id, body, author, votes, created_at }) => {
  const formattedDate = convertDate(created_at);

  return (
    <>
      <p>{body}</p>
      <p>{author}</p>
      <p>{formattedDate}</p>
      <button>votes: {votes}</button>
    </>
  );
};

export default CommentCard;
