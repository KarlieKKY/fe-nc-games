import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-s0lm.onrender.com/",
});

export const fetchAllReviews = () => {
  return gamesApi.get("/api/reviews").then((response) => {
    return response.data;
  });
};
