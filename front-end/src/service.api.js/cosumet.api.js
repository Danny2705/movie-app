import axios from "axios";
 
//Default URL
const url = "https://new-movie-phi.vercel.app/anime/zoro/";

export const fetchAnime = async () => {
    try {
        const { data } = await axios.get('https://new-movie-phi.vercel.app/anime/zoro/""')
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const searchAnime = async (name = "", page = 1) => {
    try {
        const { data } = await axios.get(url + name, { params: { page: page } })
        console.log(url + '/' + name)
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};