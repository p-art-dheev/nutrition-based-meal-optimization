import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { addBulkToPantry, addToPantry, fetchDatasetRows } from '../services/dataApi';
import type { DatasetRow } from '../types/dataset';
import './DatasetTable.css';

interface DatasetTableProps {
  refreshKey: number;
  onPantryChange: () => void;
}

const formatCell = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return value.toLocaleString();
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return String(value);
};

export const DatasetTable: React.FC<DatasetTableProps> = ({ refreshKey, onPantryChange }) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [foodColumn, setFoodColumn] = useState('food');
  const [rows, setRows] = useState<DatasetRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [bulkAdding, setBulkAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDatasetRows(0, 0);
      setColumns(data.columns);
      setFoodColumn(data.food_column);
      setRows(data.rows);
      setTotal(data.total);
      setSelectedIds(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dataset');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRows();
  }, [loadRows, refreshKey]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      const food = row.values[foodColumn];
      return food != null && String(food).toLowerCase().includes(q);
    });
  }, [rows, search, foodColumn]);

  const selectableRows = useMemo(
    () => filteredRows.filter((row) => !row.in_pantry),
    [filteredRows],
  );

  const allSelectableSelected =
    selectableRows.length > 0 && selectableRows.every((row) => selectedIds.has(row.id));

  const someSelectableSelected = selectableRows.some((row) => selectedIds.has(row.id));

  const handleToggleRow = (rowId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (allSelectableSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(selectableRows.map((row) => row.id)));
    }
  };

  const handleAddToPantry = async (rowId: number) => {
    setAddingId(rowId);
    try {
      await addToPantry(rowId);
      setRows((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, in_pantry: true } : row)),
      );
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(rowId);
        return next;
      });
      onPantryChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to pantry');
    } finally {
      setAddingId(null);
    }
  };

  const handleAddSelected = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    setBulkAdding(true);
    try {
      await addBulkToPantry(ids);
      const idSet = new Set(ids);
      setRows((prev) =>
        prev.map((row) => (idSet.has(row.id) ? { ...row, in_pantry: true } : row)),
      );
      setSelectedIds(new Set());
      onPantryChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add selected items');
    } finally {
      setBulkAdding(false);
    }
  };

  const displayColumns = columns.filter((col) => col !== foodColumn);

  if (loading) {
    return <div className="dataset-table-status">Loading dataset…</div>;
  }

  if (error) {
    return <div className="dataset-table-status error">{error}</div>;
  }

  return (
    <div className="dataset-table-wrapper">
      <div className="dataset-table-toolbar">
        <div className="dataset-table-meta">
          <span>{total.toLocaleString()} food items</span>
          <span className="meta-dot">·</span>
          <span>{columns.length} columns</span>
          {search && (
            <>
              <span className="meta-dot">·</span>
              <span>{filteredRows.length} shown</span>
            </>
          )}
          {selectedIds.size > 0 && (
            <>
              <span className="meta-dot">·</span>
              <span>{selectedIds.size} selected</span>
            </>
          )}
        </div>
        <div className="dataset-toolbar-actions">
          {selectedIds.size > 0 && (
            <button
              type="button"
              className="toolbar-btn primary"
              onClick={handleAddSelected}
              disabled={bulkAdding}
            >
              {bulkAdding ? 'Adding…' : `Add selected (${selectedIds.size})`}
            </button>
          )}
          <input
            type="search"
            className="dataset-search"
            placeholder="Search food items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dataset-table-scroll">
        <table className="dataset-table">
          <thead>
            <tr>
              <th className="col-select sticky-col-select">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={allSelectableSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelectableSelected && !allSelectableSelected;
                    }}
                    onChange={handleSelectAll}
                    disabled={selectableRows.length === 0}
                    title="Select all"
                  />
                  <span className="select-all-text">All</span>
                </label>
              </th>
              <th className="col-food sticky-col">{foodColumn}</th>
              {displayColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => {
              const foodName = formatCell(row.values[foodColumn]);
              const isSelected = selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  className={[
                    row.in_pantry ? 'in-pantry' : undefined,
                    isSelected ? 'selected' : undefined,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <td className="col-select sticky-col-select">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleRow(row.id)}
                      disabled={row.in_pantry}
                      aria-label={`Select ${foodName}`}
                    />
                  </td>
                  <td className="col-food sticky-col">
                    <div className="food-cell">
                      <button
                        type="button"
                        className={`btn-add-pantry${row.in_pantry ? ' added' : ''}`}
                        onClick={() => handleAddToPantry(row.id)}
                        disabled={row.in_pantry || addingId === row.id}
                        title={row.in_pantry ? 'Already in pantry' : 'Add to pantry'}
                      >
                        {row.in_pantry ? '✓' : '+'}
                      </button>
                      <span className="food-name" title={foodName}>
                        {foodName}
                      </span>
                    </div>
                  </td>
                  {displayColumns.map((col) => (
                    <td key={col}>{formatCell(row.values[col])}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
