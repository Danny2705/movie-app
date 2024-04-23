import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  advanceSearchAnime,
  getAdvanceSearchAnimePage,
} from "../../service.api.js/jikan.api";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function SearchPagination({
  setMoviesLetter,
  totalPage,
  setTotalPage,
  currentPage,
  setCurrentPage,
}) {
  const searchPrompt = useSelector((state) => state.content.searchPrompt);
  const searchType = useSelector((state) => state.content.searchType);
  const searchGenres = useSelector((state) => state.content.searchGenres);
  const searchStatus = useSelector((state) => state.content.searchStatus);

  useEffect(() => {
    const fetchPagination = async () => {
      try {
        const pageNumber = await getAdvanceSearchAnimePage(1, {
          q: searchPrompt || "",
          type: searchType || "",
          genres: searchGenres || [],
          status: searchStatus || "",
        });
        setTotalPage(pageNumber.pagination.last_visible_page);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching pagination:", error);
      }
    };
    fetchPagination();
  }, [searchPrompt, searchType, searchGenres, searchStatus]);

  const handlePageClick = async (event) => {
    try {
      const newPageNumber = event.selected + 1;
      const response = await getAdvanceSearchAnimePage(newPageNumber, {
        q: searchPrompt || "",
        type: searchType || "",
        genres: searchGenres || [],
        status: searchStatus || "",
      });
      console.log(response);
      setMoviesLetter(response.data);
      setCurrentPage(newPageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error handling page click:", error);
    }
  };

  return (
    <>
      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"pagination-active"}
        onPageChange={handlePageClick}
        pageCount={totalPage}
        forcePage={currentPage - 1}
        breakLabel='...'
        previousLabel={<FcPrevious />}
        previousClassName='bg-slate-900 p-2 rounded-full'
        nextLabel={<FcNext />}
        nextClassName='bg-slate-900 p-2 rounded-full'
      />
    </>
  );
}
