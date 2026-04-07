import React, { useEffect, useState } from 'react';
import './loader.css';

const Loader = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (showContent) return children;

  return (
    <div className="loader-wrapper">
      <span className="loader-letter">L</span>
      <span className="loader-letter">o</span>
      <span className="loader-letter">a</span>
      <span className="loader-letter">d</span>
      <span className="loader-letter">i</span>
      <span className="loader-letter">n</span>
      <span className="loader-letter">g</span>
      <div className="loader" />
    </div>
  );
};

export default Loader;