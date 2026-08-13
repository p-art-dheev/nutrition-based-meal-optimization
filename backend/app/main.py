from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated
import pandas as pd
import io

app = FastAPI(title="Nutrition Based Meal Optimization API")

# Configure CORS so the React frontend can communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.post("/api/data/upload")
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
    
    # Calculate statistics based on the requirements
    files_processed = len(files)
    food_items = len(combined_df)
    columns = len(combined_df.columns)
    
    # In the future, we can add more logic here to:
    # - Validate specific CSV column requirements
    # - Check missing values
    # - More advanced combination logic
    
    return {
        "success": True,
        "files_processed": files_processed,
        "food_items": food_items,
        "columns": columns
    }
