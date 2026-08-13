import React from 'react';
import './UploadStats.css';

interface UploadStatsProps {
  data: {
    files_processed: number;
    food_items: number;
    columns: number;
  };
  onReset: () => void;
}

export const UploadStats: React.FC<UploadStatsProps> = ({ data, onReset }) => {
  return (
    <div className="stats-container glass-panel">
      <div className="stats-header">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Upload Successful!</h2>
        <p>Your dataset has been processed and is ready for optimization.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className="stat-value">{data.files_processed}</div>
          <div className="stat-label">Files Combined</div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-value">{data.food_items.toLocaleString()}</div>
          <div className="stat-label">Total Food Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <div className="stat-value">{data.columns}</div>
          <div className="stat-label">Data Columns</div>
        </div>
      </div>

      <div className="stats-actions">
        <button className="secondary-btn" onClick={onReset}>
          Upload New Dataset
        </button>
        <button className="primary-btn">
          Proceed to Optimization
        </button>
      </div>
    </div>
  );
};
