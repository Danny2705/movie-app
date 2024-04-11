import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import Popular from "../../components/Popular/Popular";
import Upcoming from "../../components/Upcoming/Upcoming";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);
  return (
    <div className='relative'>
      <Home scroll={scroll} />
      <Popular />
      <Upcoming />
      <Footer />
    </div>
  );
}
