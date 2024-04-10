// Importing necessary components
import Navbar from './components/Navbar';
import { Inter } from 'next/font/google';
import PieChart from './components/pieChart';
import Footer from './components/Footer';
import Link from "next/link";
import ImageSlider from './components/ImageSlider';

// Define the Inter font with appropriate weights
const inter = Inter({ subsets: ['latin'], weights: ['400', '700'] }); // Include '700' for bold text

// Enhanced Home function component
export default function Home() {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar />

          {/* Search Area */}
          <div className="bg-yellow-500/90 p-[7rem] items-center justify-center">
            <div className="flex items-center justify-center space-x-1">
              <input type="text" 
              placeholder="Search" 
              className="p-2 w-[70%] rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-yellow-600 hover:text-black transition-colors duration-300">Search</button>
            </div>
          </div>

          {/* Body */}
          <main className='bg-gray-50 text-gray-900 flex flex-1 flex-col md:flex-row justify-between p-4'>
            <div className="infoBox flex-1">
              <h1 className="text-center text-3xl font-bold mt-6 mb-4">The Advancing Gender Inclusive Excellence (AGIE) Project</h1>
              <h2 className="text-center text-lg mt-3 mb-6">Institutional change in higher education regarding diversity, equity, and inclusion tends to be complex, contested, and slow moving. The AGIE Project aims to increase the participation and advancement of diverse women faculty in STEMM. This central repository provides resources to promote gender equity in academia.</h2>
            </div>

            <div className="flex-1 flex justify-center">
              <PieChart />
            </div>
           </main>

      <Footer />
    </div>
  );
}
