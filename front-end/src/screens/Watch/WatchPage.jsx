import React, { useEffect, useRef, useState } from 'react';
import {
	cosumetGetAnimeInfo,
	cosumetGetAnimeStream,
	cosumetSearchAnime,
} from '../../service.api.js/cosumet.api';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getAnimeById } from '../../service.api.js/jikan.api';
import Navbar from '../../components/Navbar/Navbar';
import ReactPlayer from 'react-player/lazy';
import { useDispatch, useSelector } from 'react-redux';
import { setAnimeInfo } from '../../redux/contentSlice';
import { Link } from 'react-router-dom';
import RightMovie from '../../components/RightMovie';
import View from '../../components/View';
import MovieDetail from '../../components/MovieDetail/MovieDetail';

const WatchPage = () => {
	// const movier = null;
	const params = useParams();
	const darkMode = useSelector((state) => state.theme.darkMode);
	const [scroll, setScroll] = useState(0);
	const animeInfo = useSelector((state) => state.content.animeInfo);
	const [animeDetail, setAnimeDetail] = useState({});
	const [watchInfo, setWatchInfo] = useState({});
	const [watch, setWatch] = useState([]);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const episode = searchParams.get('episode');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selected, setSelected] = useState('Movie Detail');
	// const [loading, setLoading] = useState(false)
	// const [playerState, setPlayerState] = useState({
  //   pip: false,
  //   playing: true,
  //   controls: false,
  //   light: false,
  //   volume: 0.8,
  //   muted: false,
  //   played: 0,
  //   loaded: 0,
  //   duration: 0,
  //   playbackRate: 1.0,
  //   loop: false
	// })
	// const ref = useRef()

	// const handlePlayPause = () => {
  //   setPlayerState({ ...playerState ,playing: !this.state.playing })
  // }

  // const handleStop = () => {
  //   setPlayerState({ ...playerState ,url: null, playing: false })
  // }

  // const handleToggleControls = () => {
  //   setPlayerState({...playerState ,
  //     controls: !this.state.controls,
  //     url: null
  //   })
  // }

  // const handleToggleLight = () => {
  //   setPlayerState({ ...playerState ,light: !this.state.light })
  // }

  // const handleToggleLoop = () => {
  //   setPlayerState({ ...playerState ,loop: !this.state.loop })
  // }

  // const handleVolumeChange = e => {
  //   setPlayerState({ ...playerState ,volume: parseFloat(e.target.value) })
  // }

  // const handleToggleMuted = () => {
  //   setPlayerState({ ...playerState ,muted: !this.state.muted })
  // }

  // const handleSetPlaybackRate = e => {
  //   setPlayerState({ ...playerState ,playbackRate: parseFloat(e.target.value) })
  // }

  // const handleOnPlaybackRateChange = (speed) => {
  //   setPlayerState({ ...playerState ,playbackRate: parseFloat(speed) })
  // }

  // const handleTogglePIP = () => {
  //   setPlayerState({ ...playerState ,pip: !this.state.pip })
  // }

  // const handlePlay = () => {
  //   console.log('onPlay')
  //   setPlayerState({ ...playerState ,playing: true })
  // }

  // const handleEnablePIP = () => {
  //   console.log('onEnablePIP')
  //   setPlayerState({ ...playerState ,pip: true })
  // }

  // const handleDisablePIP = () => {
  //   console.log('onDisablePIP')
  //   setPlayerState({ ...playerState ,...playerState ,pip: false })
  // }

  // const handlePause = () => {
  //   console.log('onPause')
  //   setPlayerState({ ...playerState ,playing: false })
  // }

  // const handleSeekMouseDown = e => {
  //   setPlayerState({ ...playerState ,seeking: true })
  // }

  // const handleSeekChange = e => {
  //   setPlayerState({ ...playerState ,played: parseFloat(e.target.value) })
  // }

  // const handleSeekMouseUp = e => {
  //   setPlayerState({ ...playerState ,seeking: false })
  //   this.player.seekTo(parseFloat(e.target.value))
  // }

  // const handleProgress = state => {
  //   console.log('onProgress', state)
  //   // We only want to update time slider if we are not currently seeking
  //   if (!playerState.seeking) {
  //     setPlayerState(...playerState ,state)
  //   }
  // }

  // const handleEnded = () => {
  //   console.log('onEnded')
  //   setPlayerState({...playerState , playing: playerState.loop })
  // }

  // const handleDuration = (duration) => {
  //   console.log('onDuration', duration)
  //   setPlayerState({ ...playerState ,duration })
  // }

  // const handleClickFullscreen = () => {
  //   screenfull.request(document.querySelector('.react-player'))
  // }

	useEffect(() => {
		const toggleLightMode = () => {
			document.body.classList.toggle('light-mode', !darkMode);
		};

		toggleLightMode();
	}, [darkMode]);
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
			// setLoading(false)
			const jikanData = await getAnimeById(params.id);
			setAnimeDetail(jikanData.data);
			console.log(jikanData);
			let consumetData = await cosumetSearchAnime(
				jikanData.data.title.replace(/[{()}]/g, '')
			);
			if (
				!consumetData ||
				!consumetData?.results?.some(
					(item) =>
						item.title.replace(/[{()}]/g, '').toLowerCase() ===
						jikanData.data.title.replace(/[{()}]/g, '').toLowerCase()
				)
			) {
				consumetData = await cosumetSearchAnime(jikanData.data.title_english);
				console.log(consumetData);
				dispatch(
					setAnimeInfo({
						...consumetData?.results?.filter(
							(item) =>
								item.title.replace(/[{()}]/g, '').toLowerCase() ===
								jikanData.data.title_english
									.replace(/[{()}]/g, '')
									.toLowerCase()
						)[0],
						mal_id: params.id,
					})
				);
			} else {
				// console.log(
				// 	consumetData?.results?.filter((item) => item.title === jikanData.data.title)[0]
				// );
				dispatch(
					setAnimeInfo({
						...consumetData?.results?.filter(
							(item) =>
								item.title.replace(/[{()}]/g, '').toLowerCase() ===
								jikanData.data.title.replace(/[{()}]/g, '').toLowerCase()
						)[0],
						mal_id: params.id,
					})
				);
			}
			// setLoading(true);
		};
		fetchAnimeId();
	}, [params.id]);

	const fetchAnimeWatchData = async () => {
		try {
			if (animeInfo.mal_id !== params.id || !animeInfo.id) return;
			console.log('working');
			const animeInfoData = await cosumetGetAnimeInfo(animeInfo?.id);
			setWatchInfo(animeInfoData);

			const searchData = animeInfoData?.episodes?.filter(
				(ep) => ep.number.toString() === episode
			)[0];
			if (searchData) {
				const animeWatchData = await cosumetGetAnimeStream(searchData?.id);
				setWatch(animeWatchData.sources);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchAnimeWatchData();
	}, [animeInfo, location.search]);

	console.log(watch, watchInfo);
	return (
		<div
			className={`${
				darkMode ? 'dark-mode' : 'light-mode'
			} px-[100px] pt-[20px] min-h-[100vh]`}
		>
			<Navbar scroll={scroll} />
			<div className="mt-[80px] flex flex-col gap-4">
				<div>
					<h4 className="text-[13px] cursor-pointer w-fit">
						<Link to="/" className="hover:text-[grey] duration-500">
							Home
						</Link>{' '}
						/{' '}
						<Link to={'/'} className="hover:text-[grey] duration-500">
							{animeInfo?.title}
						</Link>{' '}
						/{' '}
						<span className="hover:text-[grey] duration-500">
							Episode {episode}
						</span>{' '}
					</h4>
				</div>
			</div>
			{animeInfo?.length === 0 ? (
				<div>Loading...</div>
			) : (
				<div className="flex items-start justify-between flex-wrap w-full gap-10">
					<div className="relative flex-[3]">
						{watch?.length > 0 ? (
							<div className='relative w-fit h-fit'>
							<ReactPlayer
								url={
									watch?.filter((movie) => movie.quality === '720p')[0]?.url
									// ''
								}
								controls={true}
								width={'1080px'}
								height={'640px'}
							/></div>
						) : (
							<div className="w-[1080px] h-[640px] bg-slate-600 text-black text-center flex justify-center items-center px-16 text-xl">
								Video could not load, please click{' '}
								<button
									className="mx-1 underline text-blue-400 hover:text-blue-500"
									onClick={() => {
										fetchAnimeWatchData();
									}}
								>
									{' '}
									here{' '}
								</button>{' '}
								to try again
							</div>
						)}
						<div className=" bg-[#181d1f] flex flex-wrap w-[1080px] min-h-[100px] mt-10 p-5 gap-2">
							{watchInfo?.episodes?.map((ep) => {
								return (
									<Link
										to={`/watch/${params.id}?episode=${ep.number}`}
										className=" bg-gray-600 hover:bg-gray-500 px-3 py-1 min-w-[45px] text-center rounded-lg cursor-pointer"
									>
										{ep.number}
									</Link>
								);
							})}
						</div>
						<div className='flex flex-col max-w-[1080px]  mt-10'>
							<div className="flex gap-4 min-w-[620px] max-w-[1080px]">
								<div className="min-w-[300px] h-[400px] relative">
									<img
										src={animeDetail.images?.webp.large_image_url}
										alt={animeDetail.title}
										style={{
											width: '300px',
											height: '400px',
										}}
									/>

									<div className="absolute w-full h-20px bottom-10 bg-main-red bg-opacity-70 uppercase text-center">
										Watch this
									</div>
								</div>
								<div className="flex flex-col justify-start gap-2">
									<div>
										<h1 className="text-2xl text-main-red font-josefin max-w-full">
											{animeDetail.title} / {animeDetail.title_english} /{' '}
											{animeDetail.title_japanese}
										</h1>
										<h2>{animeDetail.type}</h2>
										<div
											className="description-container max-w-ful border-b-[0.5px] border-[grey] pr-2 pb-2"
											style={{ maxHeight: '200px', overflowY: 'auto' }}
										>
											<p className="text-[grey] text-sm">
												{animeDetail.synopsis}
											</p>
										</div>
										<div>
											<View info={animeDetail} />
										</div>
									</div>
								</div>
							</div>
							<div>
								<MovieDetail
									info={animeDetail}
									selected={selected}
									setSelected={setSelected}
								/>
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-start bg-[#0f1416] justify-center">
							<RightMovie id={params.id} setSelected={setSelected} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WatchPage;
