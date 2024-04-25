import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Footer() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <footer
      className={`${
        darkMode ? "dark-mode" : "light-mode"
      } footer h-[250px] border-t border-[grey] bg-transparent text-sm relative bottom-0 w-full`}
    >
      <div className='footer-top flex items-center justify-center w-full h-full px-4'>
        <img
          src={"/assets/footer.jpg"}
          alt='footer background'
          className='relative flex-1 w-[200px] h-[180px] object-cover'
        />
        <div className='z-10 flex flex-[3] items-start justify-around'>
          <div>
            <div className='logo flex items-center'>
              <span className='font-josefin text-[#DC143C] text-2xl tracking-wider'>
                Anime
              </span>
              <span className='font-josefin text-lg'>Cave</span>
            </div>
            {/* A Short Description */}
            <p className='flex flex-col'>
              <span>
                Want to{" "}
                <span className='text-[#dc143c] font-josefin'>Relax</span> With{" "}
                <span className='text-[#dc143c] font-josefin'>
                  Anime Movies
                </span>{" "}
                ?
              </span>{" "}
              <span>
                Come and Vist our Website to Enjoy the{" "}
                <span className='text-[#dc143c] font-josefin'>Best Time</span>{" "}
                ever
              </span>
            </p>
            {/* Icon Below Here */}
            <div className='flex items-center gap-4'>
              <div className='hover:text-[#DC143C] cursor-pointer transition-all duration-150'>
                <FaFacebook />
              </div>
              <div className='hover:text-[#DC143C] cursor-pointer transition-all duration-150'>
                <FaInstagram />
              </div>
              <div className='hover:text-[#DC143C] cursor-pointer transition-all duration-150'>
                <FaTwitter />
              </div>
              <div className='hover:text-[#DC143C] cursor-pointer transition-all duration-150'>
                <FaGithub />
              </div>
            </div>
          </div>

          <div>
            <h2 className='font-josefin font-bold'>Links</h2>
            <div className='flex flex-col'>
              <span className='text-[11px] text-[grey]'>Home</span>
              <span className='text-[11px] text-[grey]'>Library</span>
              <span className='text-[11px] text-[grey]'>Upcoming</span>
              <span className='text-[11px] text-[grey]'>Schedule</span>
              <span className='text-[11px] text-[grey]'>Terms Of Service</span>
            </div>
          </div>

          <div>
            <h2 className='font-josefin font-bold'>Contact Us</h2>

            <div className='text-[11px] flex flex-col gap-5'>
              <span className='text-[grey]'>Calgary, Alberta</span>
              <div className='flex flex-col'>
                <span className='font-bold'>
                  Phone:{" "}
                  <span className='text-[grey] font-medium'>+1 234 5678</span>
                </span>
                <span className='font-bold'>
                  Email:{" "}
                  <span className='text-[grey] font-medium'>
                    animeCave@gmail.com
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          darkMode ? "dark-mode" : "light-mode"
        } flex flex-col w-full justify-center items-center text-[12px] border-t border-[grey] pt-[10px] pb-[5px]`}
      >
        <span className='text-[grey]'>
          © Copyright{" "}
          <span
            className={`font-josefin font-bold ${
              !darkMode ? "text-black" : "text-[#ffffff]"
            }`}
          >
            Danny&James
          </span>
          . All rights reserved
        </span>
        <span className='text-[grey]'>
          Designed by{" "}
          <span className='text-[#dc143c] font-josefin font-bold'>
            Danny&James
          </span>
        </span>
      </div>
    </footer>
  );
}
