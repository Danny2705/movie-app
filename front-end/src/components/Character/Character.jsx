import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { fetchAnime, searchAnime } from "../../service.api.js/cosumet.api";

export default function Character() {
  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await fetchAnime() 
      console.log(data)
    }
    fetchAnimes()
  }, [])
  return (
    <div className='px-[100px]'>
      <Navbar />
      <h1>Character</h1>
    </div>
  );
}
