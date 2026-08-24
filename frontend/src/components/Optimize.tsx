import React, { useState } from 'react';
import type { OptimizationProblem } from '../types/app';
import './Optimize.css';

interface ProblemOption {
  id: OptimizationProblem;
  title: string;
  description: string;
  objective: string;
  constraints: string[];
}

const PROBLEMS: ProblemOption[] = [
  {
    id: 'high-protein',
    title: 'High Protein',
    description:
      'Build a meal plan that maximizes protein intake while staying within calorie and budget limits.',
    objective: 'Maximize total protein (g)',
    constraints: ['Calorie range', 'Daily budget', 'Macro balance', 'Serving limits'],
  },
  {
    id: 'nutrient-deficiency',
    title: 'Nutrient Deficiency',
    description:
      'Address gaps in essential nutrients by selecting foods that cover deficient vitamins and minerals at minimum cost.',
    objective: 'Minimize cost while meeting nutrient targets',
    constraints: ['Vitamin & mineral minimums', 'Calorie range', 'Daily budget', 'Food variety'],
  },
];

interface OptimizeProps {
  hasData: boolean;
  onNavigateToData: () => void;
}

export const Optimize: React.FC<OptimizeProps> = ({ hasData, onNavigateToData }) => {
  const [selectedProblem, setSelectedProblem] = useState<OptimizationProblem | null>(null);

  const activeProblem = PROBLEMS.find((p) => p.id === selectedProblem);

  if (!hasData) {
    return (
      <div className="optimize-page">
        <div className="optimize-header">
          <h1>Optimization</h1>
          <p>Select an optimization problem to generate an optimal meal plan.</p>
        </div>
        <div className="optimize-empty surface-card">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19A9 3 0 0 0 21 19V5" />
              <path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          </div>
          <h2>No dataset loaded</h2>
          <p>Upload your nutrition data first before running an optimization.</p>
          <button className="btn-primary" onClick={onNavigateToData}>
            Go to Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="optimize-page">
      <div className="optimize-header">
        <h1>Optimization</h1>
        <p>Select an optimization problem to generate an optimal meal plan from your dataset.</p>
      </div>

      <div className="problem-grid">
        {PROBLEMS.map((problem) => (
          <button
            key={problem.id}
            type="button"
            className={`problem-card surface-card ${selectedProblem === problem.id ? 'selected' : ''}`}
            onClick={() => setSelectedProblem(problem.id)}
          >
            <div className="problem-card-header">
              <div className="problem-icon">
                {problem.id === 'high-protein' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 6.5h11" />
                    <path d="M6.5 17.5h11" />
                    <path d="M6.5 12h11" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
              </div>
              <span className="problem-select-indicator">
                {selectedProblem === problem.id ? 'Selected' : 'Select'}
              </span>
            </div>
            <h3>{problem.title}</h3>
            <p className="problem-description">{problem.description}</p>
          </button>
        ))}
      </div>

      {activeProblem && (
        <div className="problem-details surface-card">
          <h2>{activeProblem.title} Optimization</h2>
          <div className="details-grid">
            <div className="detail-block">
              <span className="detail-label">Objective</span>
              <span className="detail-value">{activeProblem.objective}</span>
            </div>
            <div className="detail-block">
              <span className="detail-label">Constraints</span>
              <ul className="constraint-list">
                {activeProblem.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <button className="btn-primary run-btn" disabled>
            Configure &amp; Run — Coming Soon
          </button>
        </div>
      )}
    </div>
  );
};
