import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchAnime } from '../../service.api.js/jikan.api';
import Card from '../../components/Card';

const SearchPage = () => {
	const location = useLocation();
	const [scroll, setScroll] = useState(0);
	const [searchData, setSearchData] = useState(null);
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

	useEffect(() => {
		if (location.state && location.state.searchData) {
			console.log(location.state);
			setSearchData(location.state.searchData);
		}
	}, [location.state]);

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
				<div className="flex flex-wrap w-full justify-between gap-4 gap-y-8">
					{searchData &&
						searchData.map((movie, index) => (
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
