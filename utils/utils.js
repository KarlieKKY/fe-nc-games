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

export const fetchVotes = (review_id) => {
  return gamesApi.get(`/api/reviews/${review_id}`).then((response) => {
    return response.data.review.votes;
  });
};

export const increaseVotes = (review_id) => {
  return gamesApi.patch(`/api/reviews/${review_id}`, { inc_votes: 1 });
  // .catch((err) => console.log(err));
};
