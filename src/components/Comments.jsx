import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import { fetchAllComments } from "../../utils/utils";
import PostComment from "./PostComment";

const Comments = () => {
  const { review_id } = useParams();
  const [currComments, setCurrComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchAllComments(review_id).then(({ comments }) => {
      setCurrComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading for comments...</p>;

  return (
    <>
      <PostComment />
      <h3>All comments: </h3>
      {currComments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            id={comment.comment_id}
            review_id={comment.review_id}
            body={comment.body}
            author={comment.author}
            votes={comment.votes}
            created_at={comment.created_at}
          />
        );
      })}
    </>
  );
};

export default Comments;
