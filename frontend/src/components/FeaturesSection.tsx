import React from 'react';
import './FeaturesSection.css';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-number">01</span>
          <h3>LOAD DATA</h3>
          <p>Import and process food nutrition data.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-number">02</span>
          <h3>ANALYZE</h3>
          <p>Generate useful statistics.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-number">03</span>
          <h3>OPTIMIZE</h3>
          <p>Find the best meal solution.</p>
        </div>
      </div>
    </section>
  );
};
