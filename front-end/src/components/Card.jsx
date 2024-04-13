import React, { useEffect, useState } from 'react';
import './Card.css';
import { FaPlay } from 'react-icons/fa';
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
	'December'
];

export default function Card({ movie, type='normal' }) {
	const [date, setDate] = useState('Unknown')
	useEffect(() => {

		if(type==='upcoming') {
			if(movie.aired.from !== null){
				const fromDate =new Date(movie.aired.from)
				setDate(months[fromDate.getMonth()] + ' ' + fromDate.getDate() + ', ' + fromDate.getFullYear())
	
			}
			else {
				setDate('Unknown')
			}
		}
	},[])
	const [toggle, setToggle] = useState(false);
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
			{(toggle && type !== 'upcoming') ? (
				<div className="absolute w-full top-0 h-full hover-card flex justify-center items-center">
					<div className="w-[70px] h-[70px] rounded-full justify-center items-center pl-2 text-main-red flex bg-transparent border-2 border-white play-btn">
						<FaPlay size={40} />{' '}
					</div>
				</div>
			) : (
				<div className='default-card'>
					<div className="absolute w-full top-0 thubnail-header flex ">
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
