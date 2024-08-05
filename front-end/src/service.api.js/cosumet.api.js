import axios from "axios";

//Default URL
const url = "https://anime-host-sigma.vercel.app/anime/gogoanime/";

export const fetchAnime = async () => {
  try {
    const { data } = await axios.get(
      "https://anime-host-sigma.vercel.app/anime/gogoanime/%20"
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAnimeInfo = async (id) => {
  try {
    const { data } = await axios.get(
      `https://anime-host-sigma.vercel.app/anime/gogoanime/info/${id}`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const cosumetSearchAnime = async (name = "", page = 1) => {
  try {
    const { data } = await axios.get(url + name, { params: { page: page } });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const cosumetGetAnimeInfo = async (id) => {
  try {
    const { data } = await axios.get(url + 'info/' + id );

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const cosumetGetAnimeStream = async (id) => {
  try {
    const { data } = await axios.get(url + 'watch/' + id + `?server=vidstreaming` );

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
