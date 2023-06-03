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
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  if (!user.authenticated) {
    return <p className="error">You must be logged in to leave a comment.</p>;
  }

  const setMessageHandler = (type, content) => {
    setMessage({ type, content });
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    setIsError(false);
    setMessage({});

    if (isEmpty(newComment)) {
      setMessageHandler("error", "Please enter a comment.");
    }
    setPosting(true);
    const contents = { username: user.name, body: newComment };

    postNewComment(review_id, contents)
      .then(({ newComment }) => {
        setCurrComments((currObj) => [newComment, ...currObj]);
        setNewComment("");
        setMessageHandler("success", "Success! Your comment has been posted.");
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setPosting(false);
      });
  };
  const handleFocus = () => {
    setMessage({});
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
              onFocus={handleFocus}
              required
            />
            {message.content && (
              <div
                style={{ color: message.type === "error" ? "red" : "green" }}
              >
                {message.content}
              </div>
            )}
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
