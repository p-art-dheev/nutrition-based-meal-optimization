from fastapi import APIRouter, HTTPException
import pandas as pd
import math
import app.state as state

router = APIRouter()

@router.get("/api/data/columns")
def get_columns():
    """
    Returns a list of numerical columns available for descriptive statistics.
    """
    if state.global_df is None:
        raise HTTPException(status_code=400, detail="No dataset loaded. Please upload a dataset first.")
    
    # Filter for numeric columns only, and exclude generic ones like 'Unnamed: 0' if possible
    numeric_cols = state.global_df.select_dtypes(include=['number']).columns.tolist()
    # Optional: exclude common index/id columns if they exist
    numeric_cols = [c for c in numeric_cols if c not in ['Unnamed: 0', 'id', 'ID']]
    
    return {"columns": numeric_cols}

@router.get("/api/data/stats/{column_name}")
def get_stats(column_name: str):
    """
    Returns descriptive statistics for a specific column.
    """
    if state.global_df is None:
        raise HTTPException(status_code=400, detail="No dataset loaded.")
        
    if column_name not in state.global_df.columns:
        raise HTTPException(status_code=404, detail=f"Column '{column_name}' not found.")
        
    # Check if the column is numeric
    if not pd.api.types.is_numeric_dtype(state.global_df[column_name]):
        raise HTTPException(status_code=400, detail=f"Column '{column_name}' is not numeric.")
        
    series = state.global_df[column_name].dropna() # Drop NaNs for accurate stats
    
    stats = {
        "count": int(series.count()),
        "mean": float(series.mean()),
        "median": float(series.median()),
        "std": float(series.std()),
        "min": float(series.min()),
        "q1": float(series.quantile(0.25)),
        "q3": float(series.quantile(0.75)),
        "max": float(series.max())
    }
    
    # Handle NaN values resulting from operations on empty/invalid series
    for k, v in stats.items():
        if math.isnan(v) or math.isinf(v):
            stats[k] = None
            
    return {"attribute": column_name, "statistics": stats}
