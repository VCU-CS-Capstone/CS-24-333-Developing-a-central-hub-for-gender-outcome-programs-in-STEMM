import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
        <Navbar />
      <div className = "text-center text-7xl mt-40 mb-20 ">
        About AGIE
      </div>
        <div className="text-center text-3xl text-bold underline mt-3">
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



      <Footer />
    </div>
    );
  }