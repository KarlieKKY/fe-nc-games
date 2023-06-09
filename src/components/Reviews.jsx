import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../utils/utils";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [currReviews, setCurrReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews().then(({ reviews }) => {
      setCurrReviews(reviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      {currReviews.map((review) => {
        return (
          <ReviewCard
            key={review.review_id}
            id={review.review_id}
            title={review.title}
            designer={review.designer}
            review_img_url={review.review_img_url}
            category={review.category}
            created_at={review.created_at}
            vote={review.votes}
            comment_count={review.comment_count}
          />
        );
      })}
    </section>
  );
};

export default Reviews;
