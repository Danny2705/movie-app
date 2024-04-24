import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUpcomingPageAnime } from "../../service.api.js/jikan.api";
import Card from "../../components/Card";

export default function UpcomingPage() {
  const [scroll, setScroll] = useState(0);
  const [data, setData] = useState({
    data: [],
    pagination: { has_next_page: true },
  });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScroll(window.scrollY);
      });
    };
  }, []);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const responseData = await getUpcomingPageAnime(1);
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAnimes();
  }, []);

  const fetchMoreData = () => {
    setTimeout(async () => {
      try {
        if (data.pagination.has_next_page) {
          const nextPage = data.pagination.current_page + 1;
          const newData = await getUpcomingPageAnime(nextPage);
          console.log(newData);

          setData((prevData) => ({
            data: [...prevData.data, ...newData.data],
            pagination: newData.pagination,
          }));
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching more data:", error);
      }
    }, 500);
  };

  return (
    <div className='px-[100px] py-20'>
      <Navbar scroll={scroll} />
      <div className='mt-[80px] flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <h4 className='text-[13px] cursor-pointer w-fit'>
            <Link to='/' className='hover:text-[grey] duration-500'>
              Home
            </Link>{" "}
            / <span className='hover:text-[grey] duration-500'>Upcoming</span>
          </h4>
          <h1 className='bg-main-red w-fit px-2 py-1 text-lg rounded-t-md'>
            Anime Library
          </h1>
        </div>

        {hasMore === true ? (
          <div className='flex flex-col'>
            <InfiniteScroll
              dataLength={data.data.length}
              next={fetchMoreData}
              hasMore={hasMore}
              mt-6
              className='flex flex-wrap gap-4 w-full justify-center'
            >
              {data.data.map((item, i) => (
                <Link
                  key={i}
                  to={`/library/title/${item.title}/${item.mal_id}`}
                >
                  <div className='border max-w-[300px]'>
                    {<Card movie={item} />}
                  </div>
                </Link>
              ))}
            </InfiniteScroll>
            <p className='text-main-red text-lg text-center mt-6'>
              Loading ...
            </p>
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={data.data.length}
              next={fetchMoreData}
              hasMore={hasMore}
              className='flex flex-wrap gap-4 w-full justify-center'
            >
              {data.data.map((item, i) => (
                <Link
                  key={i}
                  to={`/library/title/${item.title}/${item.mal_id}`}
                >
                  <div className='border max-w-[300px]'>
                    {<Card movie={item} />}
                  </div>
                </Link>
              ))}
            </InfiniteScroll>
            <p className='text-main-red text-lg text-center mt-6'>
              Yay! You have seen it all
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
