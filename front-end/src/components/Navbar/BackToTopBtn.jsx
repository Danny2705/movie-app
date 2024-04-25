import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function BackToTopBtn({ scroll }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <a
      className={`back-to-top ${darkMode ? "dark-mode" : "light-mode"} ${
        scroll > 100 ? "active" : undefined
      }`}
      onClick={backToTop}
    >
      <FaArrowUp className='icon' />
    </a>
  );
}
