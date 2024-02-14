import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link';

export default function Login() {
    return (
    <div>
        <Navbar />
        <div className="text-center mt-40"> 
        <form>
                <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-20" type="text" placeholder='Username'  />
                
        </form>
        <form>
                <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2 mt-5" type="text" placeholder='Password'  />
                
        </form>
        <button className='w-[200px] bg-black/90 text-white rounded-full px-3 py-2 hover:bg-black/50 mt-5' >
                    Log in
        </button> 
        <Link href="/createaccount">
        <div className=" underline mt-5 ">
            Create an account
        </div>
        </Link>
        <Link href="forgotpassword">
        <div className=" underline mt-1">
            Forgot user/password
        </div>
        </Link>
    </div>
      <Footer />
    </div>
    );
  }