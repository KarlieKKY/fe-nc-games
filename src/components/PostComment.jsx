import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { postNewComment } from "../../utils/utils";

const isEmpty = (value) => value.trim() === "";

const PostComment = ({ setCurrComments }) => {
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [inputErrMsg, setInputErrMsg] = useState("");
  const [posting, setPosting] = useState(false);

  if (!user.authenticated) {
    return <p className="error">You must be logged in to leave a comment.</p>;
  }

  const handleSumbit = (event) => {
    setIsError(false);
    setInputErrMsg("");
    event.preventDefault();

    if (isEmpty(newComment)) {
      setInputErrMsg("Please enter a comment.");
    }
    setPosting(true);
    const contents = { username: user.name, body: newComment };

    postNewComment(review_id, contents)
      .then(({ newComment }) => {
        setCurrComments((currObj) => [newComment, ...currObj]);
        setNewComment("");
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setPosting(false);
      });
  };

  return (
    <>
      {user.authenticated ? (
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
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              required
            />
            {inputErrMsg && <div style={{ color: "red" }}>{inputErrMsg}</div>}
          </fieldset>
          <button disabled={posting}>
            {posting ? "Posting..." : "Leave your comment"}
          </button>
        </form>
      ) : (
        <p>You must be logged in to leave a comment.</p>
      )}
    </>
  );
};

export default PostComment;
