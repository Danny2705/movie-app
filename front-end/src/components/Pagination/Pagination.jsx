import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAnimePagination } from "../../service.api.js/jikan.api";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

export default function Pagination({
  itemsPerPage,
  selectedLetter,
  setMoviesLetter,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState(0);

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
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
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
      setItemOffset(event.selected * itemsPerPage);
      setCurrentPage(newPageNumber);
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
