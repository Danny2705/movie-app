import React, { useEffect, useState } from 'react';
import {
	cosumetGetAnimeInfo,
	cosumetGetAnimeStream,
	cosumetSearchAnime,
} from '../../service.api.js/cosumet.api';
import { useLocation, useParams } from 'react-router';
import { getAnimeById } from '../../service.api.js/jikan.api';
import Navbar from '../../components/Navbar/Navbar';

const WatchPage = () => {
	const params = useParams();
	const [scroll, setScroll] = useState(0);
	const [animeInfo, setAnimeInfo] = useState({});
	const [watchInfo, setWatchInfo] = useState({});
	const [watch, setWatch] = useState({});
	const location = useLocation();
const searchParams = new URLSearchParams(location.search);
			const episode = searchParams.get('episode');
	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY);
		});
		return () => {
			window.removeEventListener('scroll', () => {
				setScroll(window.scrollY);
			});
		};
	}, [scroll]);

	useEffect(() => {
		const fetchAnimeId = async () => {
			const jikanData = await getAnimeById(params.id);
			const consumetData = await cosumetSearchAnime(jikanData.data.title);
			// console.log(data)
			// console.log(
			// 	consumetData?.results?.filter((item) => item.title === jikanData.data.title)[0]
			// );
			setAnimeInfo(
				consumetData?.results?.filter(
					(item) => item.title === jikanData.data.title
				)[0]
			);
		};
		fetchAnimeId();
	}, [params.id]);

	useEffect(() => {
		if (!animeInfo.id) return;
		const fetchAnimeWatchData = async () => {
			const animeInfoData = await cosumetGetAnimeInfo(animeInfo.id);
			setWatchInfo(animeInfoData);
			
			const searchData = watchInfo?.episodes?.filter((ep) => ep.number.toString() === episode)[0]
		if (searchData) {
			const animeWatchData = await cosumetGetAnimeStream(
				searchData?.id
			);
			console.log(animeWatchData);
		}

			
		};
		fetchAnimeWatchData();
	}, [animeInfo, location.search]);
	return (
		<div>
			<Navbar scroll={scroll} />
		</div>
	);
};

export default WatchPage;
