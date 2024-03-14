import Navbar from './components/Navbar'
import { Inter } from 'next/font/google'
import Searchbar from './components/Searchbar'
import Footer from './components/Footer'
import Link from "next/link"
import ImageSlider from './components/ImageSlider';

const inter = Inter({ subsets: ['latin']})

export default function Home() {
  return (
    <div>
      <div className='homePage'>
        <div className="contentWrapper">

          <div className="infoBox"> 
          
            <h1>Text here</h1>
          </div>

          <ImageSlider />
        </div>
      </div>

      <Navbar />
      <Footer />
    </div>
  );
}
