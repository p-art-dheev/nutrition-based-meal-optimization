import React from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">NUTRIX</div>
      <div className="nav-links">
        <a href="#data">Data</a>
        <a href="#analysis">Analysis</a>
        <a href="#optimize">Optimize</a>
      </div>
    </nav>
  );
};
