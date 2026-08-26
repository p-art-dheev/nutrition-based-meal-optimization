from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import app.state as state
from app.solvers.high_protein import solve_high_protein

router = APIRouter()


class HighProteinRequest(BaseModel):
    calorie_max: float = Field(..., gt=0, alias="calorieMax")
    fat_max: float = Field(..., gt=0, alias="fatMax")
    protein_min: float = Field(..., gt=0, alias="proteinMin")
    quantity_max: float = Field(..., gt=0, alias="quantityMax")

    model_config = {"populate_by_name": True}


@router.post("/api/optimization/high-protein")
def run_high_protein(body: HighProteinRequest):
    if state.global_df is None:
        raise HTTPException(status_code=400, detail="No dataset loaded. Please upload a dataset first.")

    df = state.global_df
    used_pantry = bool(state.pantry_ids)
    row_ids = sorted(state.pantry_ids) if used_pantry else list(range(len(df)))

    try:
        return solve_high_protein(
            df=df,
            row_ids=row_ids,
            calorie_max=body.calorie_max,
            fat_max=body.fat_max,
            protein_min=body.protein_min,
            quantity_max=body.quantity_max,
            source="pantry" if used_pantry else "dataset",
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
