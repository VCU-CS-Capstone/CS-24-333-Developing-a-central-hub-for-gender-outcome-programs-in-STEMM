import Navbar from './components/Navbar'
import { Inter } from 'next/font/google'
import SearchBar from './components/Searchbar'
import Footer from './components/Footer'
import Link from "next/link"
import ImageSlider from './components/ImageSlider';

const inter = Inter({ subsets: ['latin']})

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className='homePage'>
        <div className="contentWrapper">

          <div className="infoBox"> 
          
            <h1 className = "text-center text-2xl text-bold mt-3">The Advancing Gender Inclusive Excellence (AGIE) Project</h1>
            <h2 className = "text-center text-1xl mt-3">Institutional change in higher education regarding diversity, equity and inclusion, tends to be
            complex, contested, and slow moving. The AGIE Project aims to increase the participation and advancement of diverse women faculty 
            in the science, technology, engineering, mathematics, and medicine (STEMM) academic and research workforce. This central repository provides data, 
            tools, programs, and strategies that promote gender equity at the faculty and leadership levels in the STEMM academic and research workforce.</h2>
      
          </div>

          <ImageSlider />
        </div>
      </div>

      <Footer />
    </div>
  );
}
