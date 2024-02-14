import Navbar from './components/Navbar'
import { Inter } from 'next/font/google'
import Searchbar from './components/Searchbar'
import Footer from './components/Footer'
import Link from "next/link"

const inter = Inter({ subsets: ['latin']})

export default function Home() {
  return (
    <div>
        <Navbar />
      <div className = "text-center text-bold w-[400] text-2xl mt-40 px-2 py-3 ">
        <h1> Explore, Innovate, and Lead the way!</h1>
        <h1> The future belongs to you </h1>
      </div>
      <div> <Searchbar /> </div>
      <div className = "text-center mt-40">
        <Link href="/school-search">
        <button className='bg-black text-white text-xl rounded-full w-[300px] py-1 hover:bg-black/50' >
                    Search by School
        </button> 
        </Link>
      </div>
      <Footer />
    </div>
  );
}