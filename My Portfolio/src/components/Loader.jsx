import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (showContent) return children ?? null;

  return (
    <div className="premium-loader-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="premium-loader-scene" aria-hidden="true">
        <div className="premium-ring premium-ring-outer" />
        <div className="premium-ring premium-ring-inner" />
        <div className="premium-loader-core" />
        <div className="premium-loader-particles">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} style={{ '--particle-index': index }} />
          ))}
        </div>
      </div>
      <p className="premium-loader-text">
        Loading
        <span className="premium-loader-dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
};

export default Loader;
