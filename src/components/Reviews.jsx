import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../utils/utils";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [currReviews, setCurrReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews().then(({ reviews }) => {
      setCurrReviews(reviews);
    });
  }, []);

  return (
    <section>
      <h2>
        {currReviews.map((review) => {
          return (
            <ReviewCard
              key={review.review_id}
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
      </h2>
    </section>
  );
};

export default Reviews;
