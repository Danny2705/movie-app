import axios from "axios";

//Default URL
const url = "https://new-movie-phi.vercel.app/anime/gogoanime/";

export const fetchAnime = async () => {
    try {
        const { data } = await axios.get('https://new-movie-phi.vercel.app/anime/gogoanime/%20')
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getAnimeInfo = async (id) => {
    try {
        const { data } = await axios.get(`https://new-movie-phi.vercel.app/anime/gogoanime/info/${id}`)
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const searchAnime = async (name = "", page = 1) => {
  try {
    const { data } = await axios.get(url + name, { params: { page: page } });
    console.log(url + "/" + name);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

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
