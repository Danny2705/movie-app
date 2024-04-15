import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import searchData from '../../data/searchData.json';
import { Link, useNavigate } from 'react-router-dom';
import { searchAnime } from '../../service.api.js/jikan.api';

export default function Search() {
	const [movieList, setMovieList] = useState([...searchData]);
	const [showMovies, setShowMovies] = useState(false);
  const [input, setInput] = useState('')
  const navigate = useNavigate()

	const search = async (prompt) => {
		if (prompt === null) return;
		const data = await searchAnime(prompt);
		console.log(data.data);
		setMovieList(data.data);
	};
	const handleInputBlur = () => {
		// Delay the setShowMovies(false) to allow click event to be detected on dropdown items
		setTimeout(() => {
			setShowMovies(false);
		}, 150);
	};

  const handleBtnClick = async () => {
    const prompt = document.querySelector('input[type="text"]').value;
    if (prompt.trim() !== '') {
      const data = await searchAnime(prompt);
      navigate("/search", {state: {searchData: data.data}});
    }
  }
  
	return (
		<div>
			<div className="flex items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]">
				<CiSearch onClick={() => setShowMovies(true)} />
				<div className="h-[16px] border border-[#9298a3] w-px" />
				<input
					type="text"
					placeholder="Search"
					onFocus={() => setShowMovies(true)}
					onBlur={handleInputBlur}
          value={input}
          onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						e.key === 'Enter' && search(e.target.value);
					}}
					className="outline-none pl-2 pt-1 bg-transparent text-sm text-[#ffffff] placeholder-white::placeholder font-josefin"
				/>
			</div>
			{showMovies === true && (
				<div className="flex flex-col absolute z-10">
					{movieList.map(
						(movie, index) =>
							index < 5 && (
								<div
									key={index}
									className="w-[250px] bg-opacity-80 bg-black px-3 flex flex-col pt-2 py-2 justify-center"
								>
									<Link to={`/library/title/${movie.title}/${movie.mal_id}`}>
										<div className="flex items-center gap-4">
											<img
												src={movie.images.webp.image_url}
												alt="Movie"
												className={`h-[100px]`}
											/>
											<h1 className="w-full h-full text-sm">{movie.title}</h1>
										</div>
									</Link>
								</div>
							)
					)}
					{input ? <button
						onClick={handleBtnClick}
						className="flex w-full bg-main-red text-center items-center justify-center py-1"
					>
						Click to See More...
					</button> : ''}
				</div>
			)}
		</div>
	);
}
