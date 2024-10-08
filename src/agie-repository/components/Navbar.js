"use client";
import React from 'react';
import Link from "next/link";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import Searchbar from './Searchbar';

const Navbar = () => {
  const[menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="top-0 left-0 w-full h-20 shadow-xl bg-black"> 
      <div className="flex justify-between items-center h-full w-full px-10 2xl:px-16"> 
      
        {/* Agie Project link */}
        <div className="flex items-center uppercase hover:border-b text-3xl font-bold bg-gold" style={{ color: '#CDAE5E' }}> 
          <Link href="/">Agie Repository</Link>
        </div>

       {/* Admin Login link */}
        <div className="flex items-center uppercase hover:border-b text-1xl bg-gold" style={{ color: '#CDAE5E' }}>
           <Link href="/Login">Admin Login</Link>
        </div>

        {/* Three Line pop-up */}
        <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} color={'white'}/>
        </div>
      </div>
      
      {/* Moble Menu */ }
      <div className={
        menuOpen 
        ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
        : "fixed left-[-100%] top-0 p-10 ease-in dureation-500"
      }>
      <div className="flex w-full items-counter justify-end">
        <div onClick={handleNav} className="cursor-pointer">
          <AiOutlineClose size={25} />
        </div>
        </div>  
        <div className="flex-col py-4">
          <ul>
            <Link href="/">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
                >
                  Home
                </li>
            </Link>
            <Link href="/About">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
                >
                  About
                </li>
            </Link>
            <Link href="/Contact">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
                >
                  Contact Us
                </li>
            </Link>
            <Link href="/Results">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
                >
                  Search All Database
                </li>
            </Link>
            <Link href="/Login">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
                >
                  Admin Login
                </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="secondNav hidden sm:flex shadow-xl">
      <div className="hidden sm:flex items-center justify-start">
          <ul className="hidden sm:flex">
            <li className="ml-9 uppercase hover:border-b text-xl bg-gold my-3" style={{ color: '#CDAE5E' }}>
              <Link href="/About">About</Link>
            </li>
            <li className="ml-9 uppercase hover:border-b text-xl bg-gold my-3" style={{ color: '#CDAE5E' }}>
              <Link href="/Contact">Contact Us</Link>
            </li>
            <li className="ml-9 uppercase hover:border-b text-xl my-3" style={{ color: '#CDAE5E' }}>
              <Link href="/Results">Search Database</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  );
}

export default Navbar;
