const ReviewCard = ({
  title,
  designer,
  review_img_url,
  category,
  created_at,
  vote,
  comment_count,
}) => {
  let date = new Date(created_at);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let formattedDate = mm + "-" + dd + "-" + yyyy;

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
