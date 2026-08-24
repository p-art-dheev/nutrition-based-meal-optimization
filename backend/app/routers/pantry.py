from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import app.state as state
from app.data_utils import get_food_column, get_food_name, row_to_dict

router = APIRouter()


class PantryRowRequest(BaseModel):
    row_id: int


class PantryBulkRequest(BaseModel):
    row_ids: list[int]


def _require_dataset():
    if state.global_df is None:
        raise HTTPException(status_code=400, detail="No dataset loaded. Please upload a dataset first.")
    return state.global_df


def _validate_row_id(df, row_id: int) -> None:
    if row_id < 0 or row_id >= len(df):
        raise HTTPException(status_code=404, detail=f"Row {row_id} not found in dataset.")


@router.get("/api/pantry")
def get_pantry():
    df = _require_dataset()
    food_column = get_food_column(df)
    columns = [str(col) for col in df.columns]

    items = []
    for row_id in sorted(state.pantry_ids):
        _validate_row_id(df, row_id)
        items.append(
            {
                "id": row_id,
                "food": get_food_name(df, row_id),
                "values": row_to_dict(df, row_id, columns),
            }
        )

    return {
        "food_column": food_column,
        "count": len(items),
        "items": items,
    }


@router.post("/api/pantry/add")
def add_to_pantry(body: PantryRowRequest):
    df = _require_dataset()
    _validate_row_id(df, body.row_id)
    state.pantry_ids.add(body.row_id)
    return {
        "success": True,
        "row_id": body.row_id,
        "food": get_food_name(df, body.row_id),
        "count": len(state.pantry_ids),
    }


@router.post("/api/pantry/add-bulk")
def add_bulk_to_pantry(body: PantryBulkRequest):
    df = _require_dataset()
    added = 0
    for row_id in body.row_ids:
        if 0 <= row_id < len(df):
            state.pantry_ids.add(row_id)
            added += 1
    return {
        "success": True,
        "added": added,
        "count": len(state.pantry_ids),
    }


@router.post("/api/pantry/remove")
def remove_from_pantry(body: PantryRowRequest):
    df = _require_dataset()
    _validate_row_id(df, body.row_id)
    state.pantry_ids.discard(body.row_id)
    return {
        "success": True,
        "row_id": body.row_id,
        "count": len(state.pantry_ids),
    }


@router.delete("/api/pantry")
def clear_pantry():
    state.reset_pantry()
    return {"success": True, "count": 0}
