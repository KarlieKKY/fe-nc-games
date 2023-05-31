import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <h2>
        {currReviews.map((review) => {
          return (
            <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
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
            </Link>
          );
        })}
      </h2>
    </section>
  );
};

export default Reviews;
