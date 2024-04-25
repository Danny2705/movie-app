import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import Popular from "../../components/Popular/Popular";
import Upcoming from "../../components/Upcoming/Upcoming";
import Footer from "../../components/Footer/Footer";
import BackToTopBtn from "../../components/Navbar/BackToTopBtn";
import { useSelector } from "react-redux";

export default function Layout() {
  const [scroll, setScroll] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const toggleLightMode = () => {
      document.body.classList.toggle("light-mode", !darkMode);
    };

    toggleLightMode();
  }, [darkMode]);

  return (
    <div className='relative'>
      <Home scroll={scroll} />
      <Popular />
      <Upcoming />
      <Footer />
      <BackToTopBtn scroll={scroll} />
    </div>
  );
}
