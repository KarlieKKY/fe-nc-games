import { useParams } from "react-router";
import { fetchReviewById, increaseVotes } from "../../utils/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { convertDate } from "../../utils/convertDate";

const EachReview = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const [likeState, setLikeState] = useState(0);

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setSingleReview(review);
      setVotes(review.votes);
      setIsLoading(false);
    });
  }, [review_id]);

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
    increaseVotes(review_id, increment).catch(() => {
      setVotes((currentVotes) => currentVotes - voteChange);
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
        <p>Total likes: {votes}</p>
        {isError && (
          <p className="error">
            Something went wrong! Refresh the page and try again
          </p>
        )}
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
      </div>
      <Comments />
    </article>
  );
};

export default EachReview;
