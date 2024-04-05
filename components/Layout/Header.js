import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoVPN from "../../public/assets/logo2.svg";

const Header = () => {
  const [scrollActive, setScrollActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });

    // Check if screen size is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={"fixed top-0 w-full  z-30 bg-white-500 transition-all " + (scrollActive ? " shadow-md pt-0" : " pt-4")}>
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Link href="/">
              <a>
                <LogoVPN style={{ width: "100px", height: "20px" }} />
              </a>
            </Link>
          </div>
          {isMobile ? (
            <div className="lg:hidden col-start-1 col-end-8">
              {/* Mobile menu */}
              <button className="block lg:hidden">
                {/* Mobile Menu Icon */}
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex col-start-4 col-end-8 text-black-500 items-center">
              {/* Desktop menu */}
              <ul className="flex items-center">
                <li className="ml-4">
                  <Link href="/">
                    <a className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative">
                     Home
                    </a>
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/Data">
                    <a className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative">
                      Data
                    </a>
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/model">
                    <a className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative">
                      Models
                    </a>
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/MediMate">
                    <a className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative">
                      MediMate
                    </a>
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/Contact">
                    <a className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative">
                   Contact
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>
      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-1 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <li className="mx-1 sm:mx-2">
              <Link href="/">
                <a className="px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all">
                  Home
                </a>
              </Link>
            </li>
            <li className="mx-1 sm:mx-2">
              <Link href="/Data">
                <a className="px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all">
                  Data
                </a>
              </Link>
            </li>
            <li className="mx-1 sm:mx-2">
              <Link href="/model">
                <a className="px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all">
                  Models
                </a>
              </Link>
            </li>
            <li className="mx-1 sm:mx-2">
              <Link href="/MediMate">
                <a className="px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all">
                  MediMate
                </a>
              </Link>
            </li>
            <li className="mx-1 sm:mx-2">
              <Link href="/Contact">
                <a className="px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all">
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
      <div className="mt-20">
        {/* Content below the navbar with a gap of 20 pixels */}
        {/* Add your content here */}
      </div>
    </>
  );
};

export default Header;
