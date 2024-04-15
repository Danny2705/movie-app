import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchAnime } from '../../service.api.js/jikan.api';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchPrompt } from '../../redux/contentSlice';
import { CiSearch } from 'react-icons/ci';

const SearchPage = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [scroll, setScroll] = useState(0);
	const [searchData, setSearchData] = useState(null);
	const searchPrompt = useSelector((state) => state.content.searchPrompt);
	console.log(location);

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

	const fetchSearchResult = async () => {
		const data = await searchAnime(searchPrompt);
		setSearchData(data.data);
	};

	useEffect(() => {
		fetchSearchResult();
	}, []);

	return (
		<div className="px-[100px] min-h-[100vh] py-20">
			<Navbar scroll={scroll} />
			<div className="mt-[80px] flex flex-col gap-4">
				<h4 className="text-[13px] cursor-pointer w-fit">
					<Link to="/" className="hover:text-[grey] duration-500">
						Home
					</Link>{' '}
					/ <span className="hover:text-[grey] duration-500">Search</span>
				</h4>

				<h1 className="bg-main-red w-fit px-2 py-1 text-lg rounded-t-md">
					Advance Search
				</h1>
				<div className="flex items-center w-full justify-between flex-wrap gap-2">
					<div className="flex items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]">
						<CiSearch />
						<div className="h-[16px] border border-[#9298a3] w-px" />
						<input
							type="text"
							placeholder="Search"
							value={searchPrompt}
							onChange={(e) => {
								dispatch(setSearchPrompt(e.target.value));
							}}
							onKeyDown={(e) => {
								e.key === 'Enter' && fetchSearchResult();
							}}
							className="outline-none pl-2 pt-1 bg-transparent text-sm text-[#ffffff] placeholder-white::placeholder font-josefin"
						/>
					</div>
				</div>
				<div className="flex flex-wrap w-full justify-between gap-4 gap-y-8">
					{searchData?.map((movie, index) => (
						<div key={index} className="search-result">
							<Link to={`/library/title/${movie.title}/${movie.mal_id}`}>
								<Card movie={movie} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
