import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const signUp = async (user) => {
  return httpClient
    .post(`/user/signup`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log(error);
      return error;
    });
};

export const login = async (user) => {
  return httpClient
    .post(`/user/login`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log(error);
      return error;
    });
};

export const postComment = async (postData) => {
  return await httpClient
    .post(`/review`, postData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getComments = async (movie) => {
  return await httpClient
    .get("/review", movie)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCommentsByMovieId = async (movieId) => {
  return await httpClient
    .get(`/review/${movieId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postLikeComment = async (commentId, userId) => {
  const data = { commentId, userId };
  return await httpClient
    .post(`/review/like-comments`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
