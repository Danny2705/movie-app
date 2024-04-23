import axios from "axios";

//Default URL
const url = "https://api.jikan.moe/v4/anime";

export const getPopularAnime = async () => {
  try {
    const { data } = await axios.get(url + "?order_by=popularity");
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUpcomingAnime = async () => {
  try {
    const { data } = await axios.get(
      url + "?order_by=popularity&status=upcoming"
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRandomAnime = async () => {
  try {
    const { data } = await axios.get(
      "https://api.jikan.moe/v4/random/anime?order_by=popularity"
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimeByGenres = async (genre_id) => {
  try {
    const { data } = await axios.get(
      url + `?genres=${genre_id}&order_by=popularity`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const searchAnime = async (searchPrompt) => {
  try {
    const { data } = await axios.get(
      url + `?q=${searchPrompt}&order_by=popularity`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const advanceSearchAnime = async (searchPrompt) => {
  try {
    const { data } = await axios.get(
      url +
        `?q=${searchPrompt.q}&type=${
          searchPrompt.type
        }&genres=${searchPrompt.genres.join(",")}&status=${
          searchPrompt.status
        }&order_by=popularity`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAnimeByLetter = async (letter) => {
  try {
    const { data } = await axios.get(
      url + `?letter=${letter}&order_by=popularity`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllAnime = async () => {
  try {
    const { data } = await axios.get(url + `?order_by=popularity`);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAnimeById = async (anime_id) => {
  try {
    const { data } = await axios.get(url + `/${anime_id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimeRelations = async (anime_id) => {
  try {
    const { data } = await axios.get(url + `/${anime_id}/recommendations`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimeCharacters = async (anime_id) => {
  try {
    const { data } = await axios.get(url + `/${anime_id}/characters`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimePictures = async (anime_id) => {
  try {
    const { data } = await axios.get(url + `/${anime_id}/pictures`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimeStaff = async (anime_id) => {
  try {
    const { data } = await axios.get(url + `/${anime_id}/staff`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAnimePagination = async (page_number, letter) => {
  try {
    const { data } = await axios.get(
      url + `?page=${page_number}&letter=${letter}&order_by=popularity`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getScheduleAnime = async () => {
  try {
    const { data } = await axios.get(
      "https://api.jikan.moe/v4/schedules?kids=false"
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getScheduleAnimeByDay = async (day) => {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/schedules?filter=${day}`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAdvanceSearchAnimePage = async (pageNumber, searchPrompt) => {
  try {
    const { data } = await axios.get(
      url +
        `?q=${searchPrompt.q}&type=${
          searchPrompt.type
        }&genres=${searchPrompt.genres.join(",")}&status=${
          searchPrompt.status
        }&page=${pageNumber}&order_by=popularity`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
