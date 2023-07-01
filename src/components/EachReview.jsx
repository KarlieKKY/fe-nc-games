import { useParams } from "react-router";
import { fetchReviewById, increaseVotes } from "../../utils/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { convertDate } from "../../utils/convertDate";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

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
    <Box
      component="article"
      bgcolor="backgroundColor.main"
      sx={{ px: { xs: 0, md: 8 }, py: { xs: 0.5, md: 2 } }}
    >
      <Paper elevation={2}>
        <Card>
          <CardContent>
            <Typography
              variant="h1"
              component="h1"
              color="primary.darkerBlue"
              sx={{ fontWeight: "bold", fontSize: { xs: "2rem", md: "4rem" } }}
            >
              {singleReview.title}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              color="primary.LighterBlue"
              sx={{ fontWeight: "bold", fontSize: { md: "1.5rem" } }}
            >
              {formattedDate}
            </Typography>
            <CardMedia
              sx={{ borderRadius: "16px", maxWidth: 768 }}
              component="img"
              image={singleReview.review_img_url}
              alt={`contents of ${singleReview.title}`}
            />
            <Typography
              mt="2rem"
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              {singleReview.review_body}
            </Typography>
            {/* <p>{singleReview.review_body}</p> */}
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
          </CardContent>
        </Card>
        <Comments />
      </Paper>
    </Box>
  );
};

export default EachReview;
