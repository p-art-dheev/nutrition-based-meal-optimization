import React from 'react';
import './Navbar.css';

interface NavbarProps {
  onGetStartedClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStartedClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F5234"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="brand-leaf-icon"
          style={{ fill: '#6ca342', stroke: '#0F5234', strokeWidth: '1.8px' }}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 8 18 13a7 7 0 0 1-7 7z" />
          <path d="M9 22c2-2.5 3-4.5 3-6.5" />
        </svg>
        NUTRIX
      </div>
      <div className="nav-links">
        <a href="#data" className="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="nav-icon"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
          Data
        </a>
        <a href="#analysis" className="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="nav-icon"
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
          Analysis
        </a>
        <a href="#optimize" className="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="nav-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          Optimize
        </a>
        <button className="btn-get-started" onClick={onGetStartedClick}>
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="btn-arrow"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
