import React, { useCallback, useEffect, useState } from 'react';
import { FileUpload } from './FileUpload';
import { DatasetTable } from './DatasetTable';
import { PantryModal } from './PantryModal';
import { fetchPantry } from '../services/dataApi';
import type { UploadData } from '../types/app';
import './DataPage.css';

interface DataPageProps {
  uploadData: UploadData | null;
  onUploadSuccess: (data: UploadData) => void;
  onReset: () => void;
  onNavigateToAnalysis: () => void;
  onNavigateToOptimize: () => void;
}

export const DataPage: React.FC<DataPageProps> = ({
  uploadData,
  onUploadSuccess,
  onReset,
  onNavigateToAnalysis,
  onNavigateToOptimize,
}) => {
  const hasData = uploadData !== null;
  const [pantryRefreshKey, setPantryRefreshKey] = useState(0);
  const [pantryCount, setPantryCount] = useState(0);
  const [pantryOpen, setPantryOpen] = useState(false);

  const refreshPantryCount = useCallback(async () => {
    try {
      const data = await fetchPantry();
      setPantryCount(data.count);
    } catch {
      setPantryCount(0);
    }
    setPantryRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (hasData) {
      refreshPantryCount();
    }
  }, [hasData, refreshPantryCount]);

  const handlePantryChange = () => {
    refreshPantryCount();
  };

  return (
    <div className={`data-page${hasData ? ' data-page--loaded' : ''}`}>
      {!hasData && (
        <div className="data-page-header">
          <h1>Dataset</h1>
          <p>Upload your food nutrition data for analysis and optimization.</p>
        </div>
      )}

      {hasData ? (
        <div className="data-loaded-layout">
          <header className="data-loaded-header">
            <div className="data-loaded-title">
              <span className="data-loaded-check" aria-hidden="true">✓</span>
              <div>
                <h1>Dataset loaded</h1>
                <p>
                  {uploadData.food_items.toLocaleString()} items · {uploadData.columns} columns ·{' '}
                  {uploadData.files_processed} file{uploadData.files_processed !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="data-loaded-actions">
              <button
                type="button"
                className="data-btn pantry-btn"
                onClick={() => setPantryOpen(true)}
              >
                Pantry
                <span className="pantry-badge">{pantryCount}</span>
              </button>
              <button type="button" className="data-btn outline" onClick={onNavigateToAnalysis}>
                View Analysis
              </button>
              <button type="button" className="data-btn primary" onClick={onNavigateToOptimize}>
                Optimize
              </button>
              <button type="button" className="data-btn text" onClick={onReset}>
                Upload New
              </button>
            </div>
          </header>

          <div className="data-loaded-body">
            <DatasetTable refreshKey={pantryRefreshKey} onPantryChange={handlePantryChange} />
          </div>

          <PantryModal
            isOpen={pantryOpen}
            onClose={() => setPantryOpen(false)}
            refreshKey={pantryRefreshKey}
            onPantryChange={handlePantryChange}
          />
        </div>
      ) : (
        <div className="data-page-content surface-card">
          <FileUpload onUploadSuccess={onUploadSuccess} onContinue={onNavigateToAnalysis} />
        </div>
      )}
    </div>
  );
};
