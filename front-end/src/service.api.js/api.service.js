import axios from "axios";

const httpClient = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "movie-backend-lac.vercel.app/api",
});

export const signUp = async (user) => {
  return await httpClient
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
  return await httpClient
    .post(`/user/login`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log(error);
      return error;
    });
};

export const oAuth = async (user) => {
  return await httpClient
    .post(`/user/auth/google`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
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

export const updateComment = async (id, data) => {
  return await httpClient
    .put(`/review/${id}`, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const handleWatchlist = async (id, data) => {
  return await httpClient
    .put(`/user/watchlist/${id}`, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteComment = async (id) => {
  return await httpClient
    .delete(`/review/${id}`)
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

export const updateUserProfile = async (id, user) => {
  return await httpClient
    .put(`/user/${id}`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
