import React, { useEffect, useState } from 'react';
import './Card.css';
import { FaPlay } from 'react-icons/fa';
import { FaHeart, FaHeartCrack } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { handleWatchlist } from '../service.api.js/api.service';
import { updateUser } from '../redux/authSlice';
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default function Card({ movie, type = 'normal' }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	// console.log(movie);
	const [date, setDate] = useState('Unknown');
	useEffect(() => {
		if (type === 'upcoming') {
			if (movie.aired.from !== null) {
				const fromDate = new Date(movie.aired.from);
				setDate(
					months[fromDate.getMonth()] +
						' ' +
						fromDate.getDate() +
						', ' +
						fromDate.getFullYear()
				);
			} else {
				setDate('Unknown');
			}
		}
	}, [type, movie.aired.from]);
	const [toggle, setToggle] = useState(false);
	const [heartHover, setHeartHover] = useState(false)
	const [heartToggle, setHeartToggle] = useState(
		user && user.watchlist.some(item => item.mal_id === movie.mal_id)
	);;

	const handleAddToList = async (action) => {
		if (!user) {
			toast.error('Please login first to add to watchlist');
			return;
		}
		const updateData = {
			movie: movie,
			action: action || 'remove',
		};

		const data = await handleWatchlist(user._id, updateData);
		if(!data) return
		dispatch(updateUser(data))
	};
	return (
		<div
			className="movie-card relative"
			onMouseEnter={() => {
				setToggle(true);
			}}
			onMouseLeave={() => {
				setToggle(false);
			}}
		>
			<img
				src={movie.images.webp.large_image_url}
				alt="Movie"
				className="img-fluid"
				style={{
					width: '300px',
					height: '400px',
				}}
			/>
			{toggle && type !== 'upcoming' ? (
				<div
					onClick={(e) => {
						e.preventDefault();
						navigate(`/library/title/${movie.title}/${movie.mal_id}`);
					}}
					className="absolute w-full top-0 h-full hover-card flex justify-center items-center"
				>
					<div
						className="absolute top-2 right-2 w-10 h-10"
						onClick={(e) => {
							e.stopPropagation();
							if (!heartToggle) {
								setHeartToggle(true);
								handleAddToList('add');
							} else {
								setHeartToggle(false);
								handleAddToList('remove');
							}
						}}
						onMouseEnter={() => setHeartHover(true)}
						onMouseLeave={() => setHeartHover(false)}
					>
						{!heartToggle ? (
							heartHover ? (
								<FaHeart size={30} className="text-main-activate" />
							) : (
								<FaHeart size={30} className="" />
							)
						) : heartHover ? (
							<FaHeartCrack size={30} className="" />
						) : (
							<FaHeart size={30} className="text-main-activate" />
						)}
					</div>
					<div className="w-[70px] h-[70px] rounded-full justify-center items-center pl-2 text-main-red flex bg-transparent border-2 border-white play-btn">
						<FaPlay size={40} />{' '}
						
					</div>
				</div>
			) : (
				<div className="default-card">
					<div className="absolute bottom-2 right-2 w-10 h-10">
					{heartToggle && <FaHeart size={30} className="text-main-activate" />}
						</div>
					<div className="absolute w-full top-0 thumbnail-header flex ">
						<span className="flex-[4] flex flex-col p-2 text-xl">
							<div className="thumbnail-name">
								{movie.title_english}
								{movie.title &&
									!movie?.title
										?.toLowerCase()
										?.includes(movie?.title_english?.toLowerCase()) &&
									' - ' + movie.title}
							</div>
							<div className="text-sm text-slate-400 max-w-[200px] truncate">
								{movie.genres.map((genre, i) => {
									return (
										<span key={i} className={``}>
											{i !== 0 && ', '}
											{genre.name}
										</span>
									);
								})}
							</div>
						</span>
						<span className="flex-1 flex justify-center ">
							<div className="w-[70px] h-[70px] bg-opacity-65 bg-main-red rounded-full m-2 text-white text-sm flex text-center items-center justify-center">
								{type === 'upcoming' ? date : movie.type}
							</div>
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
