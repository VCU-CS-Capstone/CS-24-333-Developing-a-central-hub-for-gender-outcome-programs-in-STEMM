import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
        <Navbar />
        <div className="bg-yellow-500/90 p-[7rem] pb-1">
        <div className="items-center justify-center text-center">
          <div className="text-7xl uppercase font-bold mt- mb-20">
            About AGIE
          </div>
        </div>
      </div>
        <div className="text-center text-3xl text-bold underline mt-10">
          Our Story
        </div>
        <div className="text-center text-2xl my-3 ml-40 mr-40"> 
          We aim to create a vibrant community committed to fostering the success and advancement of women in the ever-evolving world of technology. Our mission is to bridge the gender gap in STEMM fields, empower women to thrive in tech careers, and create a supportive network that encourages collaboration and innovation.
        </div>
        <div className="text-center text-3xl text-bold underline mt-10">
          Our Vision
        </div>
        <div className="text-center text-2xl my-3 ml-40 mr-40"> 
        We envision a future where women are not only well-represented in technology but are also leaders, influencers, and pioneers in shaping the industry's landscape. We believe in a world where every woman has equal opportunities to succeed and make impactful contributions to the field.
        </div>
        <div className="text-center text-3xl text-bold underline mt-10">
          Acknowledgements
        </div>
        <div className="text-center text-2xl my-3 ml-40 mr-40 mb-20"> 
        Prototype website and database developed by Team CS-24-333 including:
        <ul>
          <li>Matt Frayser</li>
          <li> Jennifer Bonda </li>
          <li> Dimayri Romero </li>
          <li> Valencia Carter </li>
        </ul>
        </div>




      <Footer />
    </div>
    );
  }