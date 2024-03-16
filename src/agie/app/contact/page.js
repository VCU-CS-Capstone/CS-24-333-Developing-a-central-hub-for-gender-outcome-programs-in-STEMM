import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
    return (
        <div>
            <Navbar />
            <div className="flex mt-40 ml-20">
                <div className="mx-10">
                    <div className="mb-4 text-bold">
                        Full name
                    </div>
                  
                    <form>
                        <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2" type="text" placeholder='Full name' />
                    </form>
                    

                    <div className="mt-4 text-bold">
                        Email
                    </div>
                    <form>
                        <input className="w-[400px] text-black border-2 border-black/70 px-2 py-2" type="text" placeholder='Email' />
                    </form>

                    <div className="mt-4 text-bold">
                        Please fill message box below.
                    </div>
                    <form>
                        <input className="w-[600px] h-[300px] text-black border-2 border-black/70 px-2 py-2" type="text" placeholder='Type message here' />
                        <button className="w-[100px] bg-black/90 text-white rounded-full px-3 py-2 mt-2 hover:bg-black/50">
                            Submit
                        </button>
                    </form>
                </div>


                <div className="ml-20">
                  <div className="rounded-lg bg-gray-100 p-4">
                        <h1 className="text-left text-2xl text-bold mt-3">Contact Us</h1>
                        <h2 className="text-left text-lg mt-3">Email: agie@vcu.edu</h2>
                        <h3 className="text-left text-lg mt-3">Phone: (000) 000-0000</h3>
                        <h4 className="text-left text-lg mt-3">Address: 907 Floyd Ave, Richmond, VA 23284</h4>
                  </div>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
