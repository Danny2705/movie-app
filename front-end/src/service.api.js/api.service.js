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
