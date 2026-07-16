import './Hero.css';
import devImage from '../../assets/hero.png';

const Hero = () => {
  return (
  
    <div className="hero-container">
      <div className="hero-text">
        <h1>Hi, I'm Prabhakar Gupta 👋</h1>
        <p>I love coding and building web apps 💻</p>
      </div>
      <div className="hero-image">
        <img src={devImage} alt="Developer Illustration" />
      </div>
    </div>
  );
};

export default Hero;

