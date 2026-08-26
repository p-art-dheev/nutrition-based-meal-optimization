import React, { useState } from 'react';
import type { OptimizationProblem } from '../types/app';
import type { HighProteinInput, HighProteinResult } from '../types/optimization';
import { runHighProteinOptimization } from '../services/dataApi';
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
      'Maximize protein from pantry foods while staying within calorie, fat, and quantity limits.',
    objective: 'Maximize total protein (g)',
    constraints: ['Calories ≤ Cmax', 'Fat ≤ Fmax', 'Protein ≥ Pmin', 'Quantity ≤ Qmax'],
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

const EMPTY_HIGH_PROTEIN: Record<keyof HighProteinInput, string> = {
  calorieMax: '',
  fatMax: '',
  proteinMin: '',
  quantityMax: '',
};

const HIGH_PROTEIN_FIELDS: {
  key: keyof HighProteinInput;
  label: string;
  symbol: string;
  unit: string;
}[] = [
  { key: 'calorieMax', label: 'Maximum daily calorie limit', symbol: 'Cmax', unit: 'kcal' },
  { key: 'fatMax', label: 'Maximum daily fat limit', symbol: 'Fmax', unit: 'g' },
  { key: 'proteinMin', label: 'Minimum required protein', symbol: 'Pmin', unit: 'g' },
  { key: 'quantityMax', label: 'Maximum total food quantity', symbol: 'Qmax', unit: 'g' },
];

interface OptimizeProps {
  hasData: boolean;
  onNavigateToData: () => void;
}

export const Optimize: React.FC<OptimizeProps> = ({ hasData, onNavigateToData }) => {
  const [selectedProblem, setSelectedProblem] = useState<OptimizationProblem | null>(null);
  const [highProteinForm, setHighProteinForm] = useState(EMPTY_HIGH_PROTEIN);
  const [result, setResult] = useState<HighProteinResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [solving, setSolving] = useState(false);

  const activeProblem = PROBLEMS.find((p) => p.id === selectedProblem);

  const handleSelectProblem = (id: OptimizationProblem) => {
    setSelectedProblem(id);
    setFormError(null);
    setResult(null);
  };

  const handleHighProteinChange = (key: keyof HighProteinInput, value: string) => {
    setHighProteinForm((prev) => ({ ...prev, [key]: value }));
    setFormError(null);
  };

  const handleHighProteinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values: Partial<HighProteinInput> = {};

    for (const field of HIGH_PROTEIN_FIELDS) {
      const raw = highProteinForm[field.key].trim();
      const parsed = Number(raw);
      if (!raw || Number.isNaN(parsed) || parsed <= 0) {
        setFormError(`Enter a valid positive value for ${field.symbol} (${field.label}).`);
        setResult(null);
        return;
      }
      values[field.key] = parsed;
    }

    setFormError(null);
    setSolving(true);
    setResult(null);
    try {
      const data = await runHighProteinOptimization(values as HighProteinInput);
      setResult(data);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Optimization failed.');
    } finally {
      setSolving(false);
    }
  };

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
            onClick={() => handleSelectProblem(problem.id)}
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

          {selectedProblem === 'high-protein' ? (
            <form className="opt-form" onSubmit={handleHighProteinSubmit}>
              <h3 className="opt-form-title">User Input</h3>
              <div className="opt-form-grid">
                {HIGH_PROTEIN_FIELDS.map((field) => (
                  <label key={field.key} className="opt-field">
                    <span className="opt-field-label">
                      {field.label} ({field.unit})
                      <span className="opt-field-symbol">{field.symbol}</span>
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      placeholder={`Enter ${field.symbol}`}
                      value={highProteinForm[field.key]}
                      onChange={(e) => handleHighProteinChange(field.key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
              {formError && <p className="opt-form-error">{formError}</p>}
              <button type="submit" className="btn-primary" disabled={solving}>
                {solving ? 'Solving…' : 'Run Optimization'}
              </button>
            </form>
          ) : (
            <button className="btn-primary run-btn" disabled>
              Configure &amp; Run — Coming Soon
            </button>
          )}
        </div>
      )}

      {result && selectedProblem === 'high-protein' && (
        <div className="opt-result surface-card">
          <div className="opt-result-header">
            <h2>Model Output</h2>
            <span className={`opt-status ${result.status === 'Optimal' ? 'ok' : 'warn'}`}>
              {result.status}
            </span>
          </div>
          <p className="opt-result-message">
            {result.message} Using {result.food_count} food{result.food_count === 1 ? '' : 's'} from the {result.source}.
          </p>

          <div className="opt-totals">
            <div className="opt-total">
              <span>Total calories</span>
              <strong>{result.totals.calories.toLocaleString()} kcal</strong>
              <em>≤ {result.limits.calorie_max.toLocaleString()} Cmax</em>
            </div>
            <div className="opt-total">
              <span>Total protein</span>
              <strong>{result.totals.protein.toLocaleString()} g</strong>
              <em>≥ {result.limits.protein_min.toLocaleString()} Pmin</em>
            </div>
            <div className="opt-total">
              <span>Total fat</span>
              <strong>{result.totals.fat.toLocaleString()} g</strong>
              <em>≤ {result.limits.fat_max.toLocaleString()} Fmax</em>
            </div>
            <div className="opt-total">
              <span>Total food quantity</span>
              <strong>{result.totals.quantity.toLocaleString()} g</strong>
              <em>≤ {result.limits.quantity_max.toLocaleString()} Qmax</em>
            </div>
          </div>

          {result.foods.length > 0 && (
            <div className="opt-result-table-wrap">
              <table className="opt-result-table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Quantity xᵢ (g)</th>
                    <th>Calories (kcal)</th>
                    <th>Protein (g)</th>
                    <th>Fat (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.foods.map((food) => (
                    <tr key={food.id}>
                      <td>{food.food}</td>
                      <td>{food.quantity.toLocaleString()}</td>
                      <td>{food.calories.toLocaleString()}</td>
                      <td>{food.protein.toLocaleString()}</td>
                      <td>{food.fat.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
