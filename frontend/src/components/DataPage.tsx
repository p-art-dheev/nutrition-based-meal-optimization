import React from 'react';
import { FileUpload } from './FileUpload';
import { UploadStats } from './UploadStats';
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

  return (
    <div className={`data-page${hasData ? ' data-page--loaded' : ''}`}>
      {!hasData && (
        <div className="data-page-header">
          <h1>Dataset</h1>
          <p>Upload your food nutrition data for analysis and optimization.</p>
        </div>
      )}

      <div className="data-page-content surface-card">
        {hasData ? (
          <UploadStats
            data={uploadData}
            onReset={onReset}
            onProceedToAnalysis={onNavigateToAnalysis}
            onProceedToOptimize={onNavigateToOptimize}
          />
        ) : (
          <FileUpload
            onUploadSuccess={onUploadSuccess}
            onContinue={onNavigateToAnalysis}
          />
        )}
      </div>
    </div>
  );
};
