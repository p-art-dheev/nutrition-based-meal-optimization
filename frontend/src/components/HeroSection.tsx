import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
  onLoadDatasetClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLoadDatasetClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>Build better meals<br />with optimization.</h1>
        <p>Analyze nutritional data and find meal plans that<br />satisfy nutritional requirements and practical constraints.</p>
        
        <div className="hero-actions">
          <button className="btn-primary" onClick={onLoadDatasetClick}>
            Load Dataset
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="hero-right">
        <div className="optimization-card surface-card">
          <div className="card-header">
            <span className="card-title">OPTIMIZATION</span>
          </div>
          
          <div className="card-body">
            <div className="metric-row">
              <span className="metric-label">Calories</span>
              <span className="metric-value">2,184 kcal</span>
              <span className="metric-check">✓</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Protein</span>
              <span className="metric-value">142 g</span>
              <span className="metric-check">✓</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Fiber</span>
              <span className="metric-value">31 g</span>
              <span className="metric-check">✓</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Cost</span>
              <span className="metric-value">₹286</span>
              <span className="metric-check">✓</span>
            </div>
          </div>
          
          <div className="card-footer">
            <div className="status-indicator"></div>
            <span>Optimal solution found</span>
          </div>
        </div>
      </div>
    </section>
  );
};
