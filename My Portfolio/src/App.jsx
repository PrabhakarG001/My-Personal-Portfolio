 import "./App.css";
 import Secondpage from './components/contents/Secondpage/Secondpage.jsx';
 import Typewriter from './components/contents/Home/Typewriter.jsx';
import SplashCursor from './components/splashcursor/splashcursor.jsx';
import Footer from "./components/layout/footer.jsx";

import AuroraHero from "./components/background/AuroraHero.jsx";
import Availablecard from "./components/contents/Secondpage/Availablecard.jsx";
 import Dock from "./components/layout/dock.jsx";
 import Scrollbar from "./components/contents/Home/scrollbar.jsx"; 

 import Project from "./components/contents/Fourthpage/project.jsx";
import Touchcard from "./components/contents/Seventhpage/Touchcard.jsx";
import Form from "./components/contents/Seventhpage/Form.jsx";
import GradientText from './components/contents/Home/GradientText.jsx';


 import  BlurText from './components/contents/Home/BlurText.jsx';
import Loader from "./components/Loader.jsx";
import Navbar from "./components/layout/Navbar";


 import Goals from "./components/contents/Fifthpage/Goals.jsx";
  import Sixthpage from './components/contents/Sixthpage/Sixthpage.jsx'
 import Meabout from "./components/contents/Secondpage/Meabout.jsx"; 
import Certificatecard from "./components/contents/Secondpage/Certificatecard.jsx";

  import Achievementcard from "./components/contents/Secondpage/Achievementcard.jsx";
  import  TechStackCard  from './components/contents/Thirdpage/TechStackCard.jsx';
 import  SoftSkills  from './components/contents/Thirdpage/SoftSkills.jsx';
import ScrambledHeadings from "./components/contents/Secondpage/ScrambledHeadings.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init({ duration: 1000 });

  return (
    <>
      <SplashCursor />
      <Navbar />
      <AuroraHero />
      <Loader/>
      
      <Dock/>
      <Secondpage/>
      <Scrollbar/>
      <ScrambledHeadings/>

      <section id="typewriter">
       <BlurText 
      text="I fell in love with programming and kept falling — deeper with every bug and breakthrough. I code with passion and design with heart."
      delay={150} animateBy="words" direction="top" className="text-2xl mb-8" />

        <Typewriter className="typewriter-block" />
        <Scrollbar/>
        <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} 
        id="Gradienttext" className="custom-class" >  
        I Build Modern & Intuitive<br/> <span className="left word">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Web Experiences.</span> </GradientText> 
        </section>
      

     
        <section>
        <p id="about" className="button-about">Get to know me</p>
        <Meabout />
        <Certificatecard />
        <Availablecard />
        <Achievementcard/>
        </section>

      
        <section>
        <p id="skills" className="button-skills">Tech Arsenal</p>
        <TechStackCard />
        </section>

         <section>
        <p id="edge" className="button-edge">The other edge</p>
        <SoftSkills />
        </section>

      
        <section>
        <p id="projects" className="button-projects">My recent works</p>
        <Project />
        </section>

      
        <section>
        <p id="goals" className="button-goals">My Roadmap</p>
        <Goals />
        </section>

      
        <section>
        <p id="resume" className="button-resume">My Professional Background</p>
        <Sixthpage/>
        </section>

      
        <section>
        <p id="contact" className="button-contact">Let's work together</p>
        <Form />
         <Touchcard />
        </section>
      
        <Footer />
    </>
  );
}

export default App;




