import { convertDate } from "../../utils/convertDate";

const ReviewCard = ({
  title,
  designer,
  review_img_url,
  category,
  created_at,
  vote,
  comment_count,
}) => {
  const formattedDate = convertDate(created_at);

  return (
    <>
      <p>{title}</p>
      <p>{formattedDate}</p>
      <img
        src={review_img_url}
        alt={`${designer} designed and in the ${category} category`}
      />
      <p>Designed by: {designer}</p>
      <div aria-label="clickable-section">
        <p>{category}</p>
        <p>{vote}</p>
        <button>{comment_count}</button>
      </div>
    </>
  );
};

export default ReviewCard;
