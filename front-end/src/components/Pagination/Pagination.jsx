import React, { useEffect, useState } from "react";
import { getAnimePagination } from "../../service.api.js/jikan.api";

export default function Pagination({ setMoviesLetter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);
  const [displayedPages, setDisplayedPages] = useState([]);
  console.log(displayedPages);
  useEffect(() => {
    const fetchAnime = async (page) => {
      try {
        const data = await getAnimePagination(page);
        setMoviesLetter(data.data);
        setPrevious(data.previous);
        setNext(data.next);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };
    fetchAnime(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setDisplayedPages(generatePageNumbers());
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextButtonClick = () => {
    setDisplayedPages(generatePageNumbers(Math.max(currentPage + 5, 1)));
  };

  const handlePreviousButtonClick = () => {
    setDisplayedPages(generatePageNumbers(Math.max(currentPage - 5, 1)));
  };

  const generatePageNumbers = (startPage = currentPage) => {
    const start = Math.max(1, startPage);
    const end = Math.min(start + 4, 25);
    return Array.from({ length: end - start + 1 }, (i) => start + i);
  };

  return (
    <div>
      <div className='flex gap-4 text-lg'>
        <button
          onClick={handlePreviousButtonClick}
          className='py-1 px-2 bg-main-red'
        >
          Previous
        </button>

        {displayedPages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`${
              currentPage === page ? "active" : ""
            } py-1 px-2 bg-slate-900`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextButtonClick}
          className='py-1 px-2 bg-main-red'
        >
          Next
        </button>
      </div>
    </div>
  );
}
