import axios from 'axios';

//Default URL
const url = 'https://api.jikan.moe/v4/anime';

export const getPopularAnime = async () => {
	try {
		const { data } = await axios.get(url + '?order_by=popularity');
    console.log(data)
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};
export const getAnimeByGenres = async (genre_id) => {
	try {
		const { data } = await axios.get(url + `?genres=${genre_id}&order_by=popularity`);
    console.log(data)
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const searchAnime = async (searchPrompt) => {
	try {
		const { data } = await axios.get(url, { params: { q: searchPrompt } });
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};
