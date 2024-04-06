import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Profile() {
    return (
    <div>
        <Navbar />
      <div className = "text-center text-2xl my-40 ">
        Profile
      
        <form>
                <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-10" type="text" placeholder='Username'  /> 
        </form>
        <form>
        <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-10" type="text" placeholder='Full Name'  />
        </form>
        <form>
        <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-10" type="text" placeholder='Email'  />
        </form>
        <form>
        <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-10" type="text" placeholder='Organization'  />
        </form>
        <button className='w-[225px] bg-black/90 text-white rounded-full px-3 py-2 hover:bg-black/50 mt-5' >
            Update Profile
        </button> 
      </div>
      
      <Footer />
    </div>
    );
  }