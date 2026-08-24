from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import app.state as state
from app.data_utils import get_food_column, row_to_dict

router = APIRouter()


def _require_dataset():
    if state.global_df is None:
        raise HTTPException(status_code=400, detail="No dataset loaded. Please upload a dataset first.")
    return state.global_df


@router.get("/api/data/rows")
def get_rows(
    offset: int = Query(0, ge=0),
    limit: int = Query(0, ge=0),
):
    """
    Return dataset rows with all columns. limit=0 returns all rows from offset.
    """
    df = _require_dataset()
    food_column = get_food_column(df)
    columns = [str(col) for col in df.columns]
    total = len(df)

    if limit == 0:
        slice_df = df.iloc[offset:]
    else:
        slice_df = df.iloc[offset : offset + limit]

    rows = []
    for idx in slice_df.index:
        row_id = int(idx)
        row_data = row_to_dict(df, row_id, columns)
        rows.append(
            {
                "id": row_id,
                "in_pantry": row_id in state.pantry_ids,
                "values": row_data,
            }
        )

    return {
        "columns": columns,
        "food_column": food_column,
        "total": total,
        "offset": offset,
        "limit": limit if limit > 0 else total - offset,
        "rows": rows,
    }
