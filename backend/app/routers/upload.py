from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import pandas as pd
import io
import app.state as state

router = APIRouter()

@router.post("/api/data/upload")
async def upload_data(files: List[UploadFile] = File(...)):
    """
    Endpoint to receive CSV files, process them with Pandas,
    and return basic statistics as a JSON response.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    dfs = []
    for file in files:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail=f"File {file.filename} is not a CSV")
        
        try:
            # Read the file content into memory
            content = await file.read()
            # Parse it as a CSV with Pandas
            df = pd.read_csv(io.BytesIO(content))
            dfs.append(df)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error reading {file.filename}: {str(e)}")
            
    if not dfs:
        raise HTTPException(status_code=400, detail="No valid CSV files to process")
        
    # Combine all dataframes
    combined_df = pd.concat(dfs, ignore_index=True)
    
    # Persist the dataframe globally for analysis
    state.global_df = combined_df
    
    # Calculate statistics based on the requirements
    files_processed = len(files)
    food_items = len(combined_df)
    columns = len(combined_df.columns)
    
    return {
        "success": True,
        "files_processed": files_processed,
        "food_items": food_items,
        "columns": columns
    }
