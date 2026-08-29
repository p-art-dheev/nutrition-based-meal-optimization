import React from 'react';
import './FeaturesSection.css';

const STEPS = [
  {
    id: 'load',
    title: 'LOAD DATA',
    description: 'Import and process food nutrition data easily.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <polyline points="9 14 12 11 15 14" />
      </svg>
    ),
  },
  {
    id: 'analyze',
    title: 'ANALYZE',
    description: 'Generate insightful statistics and visualizations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'optimize',
    title: 'OPTIMIZE',
    description: 'Find the best meal solution that fits your goals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

interface StepConnectorProps {
  index: number;
}

const StepConnector: React.FC<StepConnectorProps> = ({ index }) => {
  const markerId = `arrowhead-${index}`;
  const length = 64;

  return (
    <div
      className="process-connector"
      style={{ '--connector-index': index } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 24" className="connector-svg" preserveAspectRatio="none">
        <defs>
          <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="connector-arrowhead" />
          </marker>
        </defs>
        <line
          x1="4" y1="12" x2="52" y2="12"
          className="connector-base"
          strokeDasharray="5 5"
          markerEnd={`url(#${markerId})`}
        />
        <line
          x1="4" y1="12" x2="52" y2="12"
          className="connector-active"
          strokeDasharray={length}
          style={{ '--line-length': length } as React.CSSProperties}
        />
      </svg>
    </div>
  );
};

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section" aria-label="How it works">
      <div className="process-flow">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className="process-step"
              style={{ '--step-index': index } as React.CSSProperties}
            >
              <div className="step-icon-wrapper">
                <div className="step-icon-box">{step.icon}</div>
                <div className="icon-underline" />
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>

            {index < STEPS.length - 1 && <StepConnector index={index} />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
