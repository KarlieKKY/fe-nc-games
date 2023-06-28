import {
  Box,
  Button,
  Card,
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
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box onClick={() => navigate(`/reviews/${id}`)}>
            <CardHeader title={title} subheader={formattedDate} />
            <CardMedia
              component="img"
              height="194"
              image={review_img_url}
              alt={`${designer} designed and in the ${category} category`}
            />
            <Typography>Designed by: {designer}</Typography>
          </Box>
          <Box>
            <Typography>Category: {category}</Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" color="likeColor.main">
                <FavoriteIcon />
                <Typography>{vote}</Typography>
              </Stack>
              <Box>
                <Button variant="contained" color="secondary" sx={{ gap: 1 }}>
                  <ChatBubbleOutlineRoundedIcon />
                  {comment_count} Comments
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard;
