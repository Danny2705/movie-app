import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  advanceSearchAnime,
  searchAnime,
} from "../../service.api.js/jikan.api";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchGenre,
  setSearchPrompt,
  setSearchType,
  setSearchStatus,
  clearSearch,
} from "../../redux/contentSlice";
import { CiSearch } from "react-icons/ci";
import Select from "../../components/Select";
import { Rating } from "@mui/material";
import CheckboxDropdown from "../../components/CheckboxDropdown";
import { FaSearch } from "react-icons/fa";
import SearchPagination from "./SearchPagination";

const typeOptions = [
  { value: "", label: "Any" },
  { value: "tv", label: "TV Series" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
  { value: "cm", label: "Commercial" },
  { value: "pv", label: "Promotional Video" },
  { value: "tv_special", label: "TV Special" },
];
const genresOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Action" },
  { value: 2, label: "Adventure" },
  { value: 4, label: "Comedy" },
  { value: 8, label: "Drama" },
  { value: 10, label: "Fantasy" },
  { value: 23, label: "School" },
  { value: 30, label: "Sport" },
  { value: 37, label: "Supernatural" },
  { value: 62, label: "Isekai" },
];

const statusOptions = [
  { value: "", label: "Any" },
  { value: "upcoming", label: "Upcoming" },
  { value: "airing", label: "Now Airing" },
  { value: "complete", label: "Completed" },
];

const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const [searchData, setSearchData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const searchPrompt = useSelector((state) => state.content.searchPrompt);
  const searchType = useSelector((state) => state.content.searchType);
  const searchGenres = useSelector((state) => state.content.searchGenres);
  const searchStatus = useSelector((state) => state.content.searchStatus);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, []);

  const fetchSearchResult = async (reload) => {
    const data = await searchAnime(reload === "reload" ? "" : searchPrompt);
    console.log(data);
    setSearchData(data.data);
  };

  useEffect(() => {
    const reload = () => {
      dispatch(clearSearch());
      fetchSearchResult("reload");
    };
    reload();
  }, []);

  const handleTypeSelect = (option) => {
    console.log(option);
    dispatch(setSearchType(option.value));
  };

  const handleStatusSelect = (option) => {
    console.log(option);

    dispatch(setSearchStatus(option.value));
  };

  const handleGenreChange = (selectedOptions) => {
    console.log(console.log(selectedOptions));

    dispatch(setSearchGenre(selectedOptions[0] === 0 ? [] : selectedOptions));
  };

  const advanceSearch = async () => {
    const data = await advanceSearchAnime({
      q: searchPrompt || "",
      type: searchType || "",
      genres: searchGenres || [],
      status: searchStatus || "",
    });
    setSearchData(data.data);
  };

  return (
    <div className='px-[100px] min-h-[100vh] py-20'>
      <Navbar scroll={scroll} />
      <div className='mt-[80px] flex flex-col gap-4'>
        <h4 className='text-[13px] cursor-pointer w-fit'>
          <Link to='/' className='hover:text-[grey] duration-500'>
            Home
          </Link>{" "}
          / <span className='hover:text-[grey] duration-500'>Search</span>
        </h4>

        <h1 className='bg-main-red w-fit px-2 py-1 text-lg rounded-t-md'>
          Advance Search
        </h1>
        <div className='flex items-center w-full justify-start relative flex-wrap mt-10 gap-2'>
          <div className='flex items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]'>
            <div className='absolute text-sm -top-4 bg-black px-1'>
              Search Text
            </div>
            {/* <CiSearch />
						<div className="h-[16px] border border-[#9298a3] w-px" /> */}
            <input
              type='text'
              placeholder='Enter search...'
              value={searchPrompt}
              onChange={(e) => {
                dispatch(setSearchPrompt(e.target.value));
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && fetchSearchResult();
              }}
              className='outline-none pl-2 pt-1 bg-transparent text-sm text-[#ffffff] placeholder-white::placeholder font-josefin'
            />
          </div>
          <div className='flex relative items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]'>
            <div className='absolute text-sm -top-4 bg-black px-1'>Type</div>
            <Select options={typeOptions} onSelect={handleTypeSelect} />
          </div>
          <div className='flex relative items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]'>
            <div className='absolute text-sm -top-4 bg-black px-1'>Genres</div>
            <CheckboxDropdown
              options={genresOptions}
              onSelectionChange={handleGenreChange}
            />
          </div>
          <div className='flex relative items-center border-2 border-[#e9e7e7] p-1 gap-1 cursor-pointer rounded-sm w-[250px]'>
            <div className='absolute text-sm -top-4 bg-black px-1'>Status</div>
            <Select options={statusOptions} onSelect={handleStatusSelect} />
          </div>
          <div
            className='absolute bg-main-red hover:bg-main-activate border-2 border-main-red text-center right-0 hover:border-main-activate font-bold p-1 w-20 flex gap-2 flex-rows items-center justify-center cursor-pointer'
            onClick={advanceSearch}
          >
            <FaSearch /> <span>Search</span>
          </div>
        </div>
        <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
          {searchData === null ? (
            <div className='text-xl h-[100vh]'>Loading ...</div>
          ) : (
            <div className='flex flex-wrap w-full justify-between gap-4 gap-y-8'>
              {searchData?.map(
                (movie, index) =>
                  movie.popularity > 0 && (
                    <div key={index} className='search-result'>
                      <Link
                        to={`/library/title/${movie.title}/${movie.mal_id}`}
                      >
                        <Card movie={movie} />
                      </Link>
                    </div>
                  )
              )}
              <div className='w-full flex justify-center'>
                <SearchPagination
                  setMoviesLetter={setSearchData}
                  totalPage={totalPage}
                  setTotalPage={setTotalPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
