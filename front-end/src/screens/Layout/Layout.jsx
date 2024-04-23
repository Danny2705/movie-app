import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import Popular from "../../components/Popular/Popular";
import Upcoming from "../../components/Upcoming/Upcoming";
import Footer from "../../components/Footer/Footer";
import BackToTopBtn from "../../components/Navbar/BackToTopBtn";

export default function Layout() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
