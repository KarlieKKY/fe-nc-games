import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { convertDate } from "../../utils/convertDate";
import { Link, useNavigate } from "react-router-dom";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: "100%", md: 345 },
          display: "flex",
          flexDirection: "column",
          maxHeight: "100%",
          height: "100%",
          width: "100%",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <CardActionArea onClick={() => navigate(`/reviews/${id}`)}>
            <CardHeader
              sx={{ paddingLeft: "0px" }}
              title={
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {title}
                </Typography>
              }
              subheader={
                <Typography
                  color="primary.LighterBlue"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  {formattedDate}
                </Typography>
              }
            />
          </CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image={review_img_url}
            alt={`${designer} designed and in the ${category} category`}
          />
          <Typography
            gutterBottom
            variant="body2"
            pt={1}
            color="primary.LighterBlue"
          >
            Designed by: {designer}
          </Typography>
          <Typography variant="body2" color="primary.LighterBlue">
            Category: {category}
          </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 0 }} p={"16px"} pt={"0px"}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" color="likeColor.main">
              <FavoriteIcon />
              <Typography>{vote}</Typography>
            </Stack>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                gap: 1,
                fontWeight: "bold",
                color: "primary.darkerBlue",
              }}
            >
              <ChatBubbleOutlineRoundedIcon />
              {comment_count} Comments
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default ReviewCard;
