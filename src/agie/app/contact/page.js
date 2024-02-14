import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
    return (
    <div>
        <Navbar />
      <div className = "my-40 ">
      <div className="mx-10 mt-4 text-bold">
            Full name
        </div>
      <form>
                <input className="w-[400px] mx-10 text-black border-2 border-black/70 px-2 py-2" type="text" placeholder='Full name'  />
                
        </form>
        <div className="mx-10 mt-4 text-bold">
            Email
        </div>
        <form>
                <input className="w-[400px] mx-10 text-black border-2 border-black/70 px-2 py-2" type="text" placeholder='email'  />
                
        </form>
        <div className="mx-10 mt-4 text-bold">
            Please fill message box below. 
        </div>
        <form>
                <input className="w-[600px] mx-10 h-[300px] text-black border-2 border-black/70 px-2" type="text" placeholder='Type message here'  />  
                <button className="bottom w-[100px] bg-black/90 text-white rounded-full px-3 py-2 hover:bg-black/50" >
                    Submit
        </button> 
        </form>
        
      </div>
      <Footer />
    </div>
    );
  }