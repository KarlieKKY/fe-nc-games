import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-s0lm.onrender.com/",
});

export const fetchAllReviews = () => {
  return gamesApi.get("/api/reviews").then((response) => {
    return response.data;
  });
};

export const fetchReviewById = (id) => {
  return gamesApi.get(`/api/reviews/${id}`).then((response) => {
    return response.data;
  });
};

export const fetchAllComments = (id) => {
  return gamesApi.get(`/api/reviews/${id}/comments`).then((response) => {
    return response.data;
  });
};

export const increaseVotes = (review_id, inc_votes) => {
  return gamesApi.patch(`/api/reviews/${review_id}`, { inc_votes });
};

export const postNewComment = (review_id, contents) => {
  return gamesApi
    .post(`/api/reviews/${review_id}/comments`, contents)
    .then((response) => {
      return response.data;
    });
};
