import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAnimePagination } from "../../service.api.js/jikan.api";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

export default function Pagination({
  selectedLetter,
  setMoviesLetter,
  totalPage,
  setTotalPage,
  currentPage,
  setCurrentPage,
}) {
  useEffect(() => {
    const fetchPagination = async () => {
      try {
        let pageNumber;
        if (selectedLetter === "Show All") {
          pageNumber = await getAnimePagination(1, "");
        } else {
          pageNumber = await getAnimePagination(1, selectedLetter);
        }
        setTotalPage(pageNumber.pagination.last_visible_page);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching pagination:", error);
      }
    };
    fetchPagination();
  }, [selectedLetter]);

  const handlePageClick = async (event) => {
    try {
      const newPageNumber = event.selected + 1;
      let response;
      if (selectedLetter === "Show All") {
        response = await getAnimePagination(newPageNumber, "");
      } else {
        response = await getAnimePagination(newPageNumber, selectedLetter);
      }
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
