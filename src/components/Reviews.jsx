import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../utils/utils";
import ReviewCard from "./ReviewCard";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

const Reviews = () => {
  const [currReviews, setCurrReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews().then(({ reviews }) => {
      setCurrReviews(reviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <Stack
        justifyContent="center"
        sx={{ color: "grey.500" }}
        spacing={4}
        direction="row"
      >
        <CircularProgress />
        <Typography variant="h5">Loading...</Typography>
      </Stack>
    );

  return (
    <Box
      sx={{
        padding: { xs: 1, md: 6 },
        backgroundColor: "backgroundColor.main",
      }}
    >
      <Grid container justifyContent="center" alignItems="stretch" gap={2}>
        {currReviews.map((review) => {
          return (
            <Grid
              key={review.review_id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
            >
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
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Reviews;
