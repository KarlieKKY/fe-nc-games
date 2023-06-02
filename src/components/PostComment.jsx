import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { postNewComment } from "../../utils/utils";

const PostComment = ({ setCurrComments }) => {
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [isError, setIsError] = useState(false);

  // console.log(user, newComment);
  if (!user.authenticated) {
    return <p className="error">You must be logged in to leave a comment.</p>;
  }

  const handleSumbit = (event) => {
    setIsError(false);
    event.preventDefault();
    const contents = { username: user.name, body: newComment };
    console.log(contents, review_id);
    postNewComment(review_id, contents)
      .then(({ newComment }) => {
        setCurrComments((currObj) => [newComment, ...currObj]);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <form onSubmit={handleSumbit}>
      <fieldset>
        <legend> Leave a comment: </legend>
        {isError && (
          <p className="error">
            Oops..Something went wrong, please try again T^T
          </p>
        )}
        <label htmlFor="comment_body"></label>
        <textarea
          placeholder="comment here..."
          type="text"
          id="comment_body"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
      </fieldset>
      <button disabled={isError}>Leave your comment</button>
    </form>
  );
};

export default PostComment;
