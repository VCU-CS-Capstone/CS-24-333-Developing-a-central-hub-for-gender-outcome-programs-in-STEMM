"use client"

import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';
import PieChart from '../components/pieChart';
import Footer from '../components/Footer';

import styles from '../styles/index.module.css'


// Define the Inter font with appropriate weights
const inter = Inter({ subsets: ['latin'], weights: ['400', '700'] }); // Include '700' for bold text

// Enhanced Home function component
export default function Home() {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  


  const handleSearch = () => {

    router.push({
      pathname: '/Results',
      query: {query: searchQuery}

    });
  };


   const handleChange = (event) => {
     setSearchQuery(event.target.value);
   };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Search Area */}
      <div className="bg-yellow-500/90 p-[7rem] items-center justify-center">
        <div className="flex items-center justify-center space-x-1">
          <input
            type="text"
            placeholder="Search our database for papers to advance gender equity in STEMM..."
            value={searchQuery}
            onChange={handleChange}
            className="p-2 w-[70%] rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 py-2 rounded hover:bg-yellow-600 hover:text-black transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Body */}
      <main className='bg-gray-50 text-gray-900 flex flex-1 flex-col md:flex-row justify-between p-4'>
        <div className="infoBox flex-1">
          <h1 className="text-center text-3xl font-bold mt-6 mb-4">The Advancing Gender Inclusive Excellence (AGIE) Repository</h1>
          <h2 className="text-center text-lg mt-3 mb-2">Institutional change in higher education regarding diversity, equity, and inclusion tends to be complex, contested, and slow moving. VCU has developed the National Coordinating Center for Advancing Gender Inclusive Excellence with the aim to increase the participation and advancement of diverse women faculty in STEMM. The three specific aims that this coordinating center aims to address are:</h2>
          <h3 className="text-left text-xl mt-3 mb-2 "> <b>Aim 1:</b> Evaluate the types and components of programs that substantially increase the participation and
advancement of diverse women faculty.</h3>
          <h4 className="text-left text-xl mt-3 mb-2"> <b>Aim 2:</b> Develop a central repository for data, tools, programs, and strategies that promote gender equity at the
faculty and leadership levels in the STEMM academic and research workforce.</h4>
          <h5 className="text-left text-xl mt-3 mb-2"> <b>Aim 3:</b> Promote and disseminate research on barriers and strategies to enhance the recruitment, retention and
advancement of STEMM women faculty in the academic and research workforce.</h5>
          <h6 className="text-center text-lg mt-3 mb-2"> This website was made to fulfill aim 2 through serving as a central repository that provides gathered resources to promote gender equity in academia.</h6>
        </div>


        
        <div className="flex-1 flex justify-center">
        
          <PieChart />
        </div>
      </main>

      <Footer />
    </div>
  );
}
