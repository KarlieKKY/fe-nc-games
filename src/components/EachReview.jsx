import { useParams } from "react-router";
import { fetchReviewById, fetchVotes, increaseVotes } from "../../utils/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { convertDate } from "../../utils/convertDate";

const EachReview = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(singleReview.votes);
  const [isError, setIsError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setSingleReview(review);
      setIsLoading(false);
    });
    fetchVotes(review_id).then((currVotes) => {
      setVotes(currVotes);
    });
  }, [review_id]);

  const votesHandler = () => {
    setVotes((currentVotes) => currentVotes + 1);
    setIsError(false);
    setHasClicked(true);
    increaseVotes(review_id).catch(() => {
      setVotes((currentVotes) => currentVotes - 1);
      setIsError(true);
    });
  };

  if (isLoading) return <p>Loading....</p>;

  const formattedDate = convertDate(singleReview.created_at);

  return (
    <article>
      <p>{singleReview.title}</p>
      <p>{formattedDate}</p>
      <img
        src={singleReview.review_img_url}
        alt={`contents of ${singleReview.title}`}
      />
      <p>{singleReview.review_body}</p>
      <p>Designed by: {singleReview.designer}</p>
      <div aria-label="clickable-section">
        <p>{singleReview.owner}</p>
        <p>{singleReview.category}</p>
        {isError && (
          <p className="error">
            Something went wrong! Refresh the page and try again
          </p>
        )}
        <button onClick={votesHandler} disabled={hasClicked && !isError}>
          votes: {votes}
        </button>
      </div>
      <Comments />
    </article>
  );
};

export default EachReview;
