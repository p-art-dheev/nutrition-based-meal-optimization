import React from 'react';
import './UploadStats.css';

interface UploadStatsProps {
  data: {
    files_processed: number;
    food_items: number;
    columns: number;
  };
  onReset: () => void;
  onProceedToAnalysis?: () => void;
  onProceedToOptimize?: () => void;
}

const STAT_ITEMS: {
  key: string;
  label: string;
  getValue: (d: UploadStatsProps['data']) => string | number;
  highlight?: boolean;
}[] = [
  { key: 'files', label: 'Files', getValue: (d) => d.files_processed },
  { key: 'items', label: 'Food Items', getValue: (d) => d.food_items.toLocaleString(), highlight: true },
  { key: 'columns', label: 'Attributes', getValue: (d) => d.columns },
];

export const UploadStats: React.FC<UploadStatsProps> = ({
  data,
  onReset,
  onProceedToAnalysis,
  onProceedToOptimize,
}) => {
  return (
    <div className="stats-container">
      <header className="stats-header">
        <div className="stats-check-ring" aria-hidden="true">
          <span className="stats-check">✓</span>
        </div>
        <div className="stats-header-text">
          <h2>Dataset loaded successfully</h2>
          <p>Your nutrition data is processed and ready for the next step.</p>
        </div>
      </header>

      <div className="stats-metrics">
        {STAT_ITEMS.map((item) => (
          <div key={item.key} className={`stats-metric${item.highlight ? ' highlight' : ''}`}>
            <span className="stats-metric-value">{item.getValue(data)}</span>
            <span className="stats-metric-label">{item.label}</span>
          </div>
        ))}
      </div>

      <footer className="stats-footer">
        <div className="stats-action-group">
          {onProceedToAnalysis && (
            <button type="button" className="primary-btn" onClick={onProceedToAnalysis}>
              View Analysis
            </button>
          )}
          {onProceedToOptimize && (
            <button type="button" className="primary-btn outline" onClick={onProceedToOptimize}>
              Proceed to Optimize
            </button>
          )}
        </div>
        <button type="button" className="secondary-btn" onClick={onReset}>
          Upload New Dataset
        </button>
      </footer>
    </div>
  );
};
