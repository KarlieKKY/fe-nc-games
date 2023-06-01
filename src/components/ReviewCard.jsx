import { useEffect, useState } from "react";
import { convertDate } from "../../utils/convertDate";
import { fetchVotes, increaseVotes } from "../../utils/utils";
import { Link } from "react-router-dom";

const ReviewCard = ({
  title,
  designer,
  review_img_url,
  category,
  created_at,
  vote,
  comment_count,
  id,
}) => {
  const formattedDate = convertDate(created_at);
  const [votes, setVotes] = useState(vote);
  const [isError, setIsError] = useState(false);
  const [likeState, setLikeState] = useState(0);

  useEffect(() => {
    fetchVotes(id).then((currVotes) => {
      setVotes(currVotes);
    });
  }, []);

  const voteHandler = (voteChange) => {
    setIsError(false);
    let increment;
    if (likeState === 0) {
      setLikeState(voteChange);
      increment = voteChange;
    } else if (likeState === voteChange) {
      setLikeState(0);
      increment = -voteChange;
    } else {
      setLikeState(voteChange);
      increment = -likeState + voteChange;
    }
    setVotes((currentVote) => currentVote + increment);
    increaseVotes(id, increment).catch(() => {
      setVotes((currentVotes) => currentVotes - voteChange);
      setIsError(true);
    });
  };

  return (
    <>
      <Link to={`/reviews/${id}`}>
        <div>
          <p>{title}</p>
          <p>{formattedDate}</p>
          <img
            src={review_img_url}
            alt={`${designer} designed and in the ${category} category`}
          />
          <p>Designed by: {designer}</p>
        </div>
      </Link>
      <div aria-label="clickable-section">
        <p>Category: {category}</p>
        {isError && (
          <p className="error">
            Something went wrong! Refresh the page and try again
          </p>
        )}
        <p>Total likes: {votes}</p>
        <button
          className={likeState === 1 && !isError ? "active" : ""}
          onClick={() => voteHandler(1)}
        >
          Like
        </button>
        <button
          className={likeState === -1 && !isError ? "active" : ""}
          onClick={() => voteHandler(-1)}
        >
          Dislike
        </button>
        <button>Comments: {comment_count}</button>
      </div>
    </>
  );
};

export default ReviewCard;
