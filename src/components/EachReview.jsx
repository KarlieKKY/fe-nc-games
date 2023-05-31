import { useParams } from "react-router";
import { fetchReviewById } from "../../utils/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";

const EachReview = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setSingleReview(review);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) return <p>Loading....</p>;

  let date = new Date(singleReview.created_at);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let formattedDate = mm + "-" + dd + "-" + yyyy;

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
        <button>{singleReview.votes}</button>
      </div>
      <Comments />
    </article>
  );
};

export default EachReview;
