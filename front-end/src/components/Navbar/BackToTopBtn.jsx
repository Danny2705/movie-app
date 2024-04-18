import React from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopBtn({ scroll }) {
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <a
      className={`back-to-top ${scroll > 100 ? "active" : undefined}`}
      onClick={backToTop}
    >
      <FaArrowUp className='icon' />
    </a>
  );
}
