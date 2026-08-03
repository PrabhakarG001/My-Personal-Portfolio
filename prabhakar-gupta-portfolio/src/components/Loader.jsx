import './Loader.css';

const Loader = () => (
  <div className="mac-loader-container">
    <svg 
      className="mac-welcome-svg" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1000 200" 
    >
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        className="mac-welcome-text-path"
      >
        Welcome to My Digital Space
      </text>
    </svg>
  </div>
);

export default Loader;
