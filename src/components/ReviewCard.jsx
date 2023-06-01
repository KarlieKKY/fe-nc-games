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
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    fetchVotes(id).then((currVotes) => {
      setVotes(currVotes);
    });
  }, []);

  const votesHandler = () => {
    setVotes((currentVotes) => currentVotes + 1);
    setIsError(false);
    setHasClicked(true);
    increaseVotes(id).catch(() => {
      setVotes((currentVotes) => currentVotes - 1);
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
        <button onClick={votesHandler} disabled={hasClicked && !isError}>
          votes: {votes}
        </button>
        <button>Comments: {comment_count}</button>
      </div>
    </>
  );
};

export default ReviewCard;
