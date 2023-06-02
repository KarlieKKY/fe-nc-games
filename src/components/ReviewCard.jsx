import { convertDate } from "../../utils/convertDate";
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

  return (
    <>
      <Link to={`/reviews/${id}`} id={id}>
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
        <p>Total likes: {vote}</p>
        <button>Comments: {comment_count}</button>
      </div>
    </>
  );
};

export default ReviewCard;
