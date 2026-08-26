from typing import Any, Optional

import pandas as pd
import pulp

from app.data_utils import get_food_name


def _find_column(df: pd.DataFrame, candidates: tuple[str, ...]) -> Optional[str]:
    lookup = {str(col).strip().lower(): col for col in df.columns}
    for name in candidates:
        if name.lower() in lookup:
            return lookup[name.lower()]
    for key, original in lookup.items():
        for name in candidates:
            if name.lower() in key:
                return original
    return None


def _numeric(value: Any) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return 0.0
    if pd.isna(number):
        return 0.0
    return max(number, 0.0)


def solve_high_protein(
    df: pd.DataFrame,
    row_ids: list[int],
    calorie_max: float,
    fat_max: float,
    protein_min: float,
    quantity_max: float,
    source: str,
) -> dict[str, Any]:
    calorie_col = _find_column(df, ("Caloric Value", "Calories", "Calorie", "Energy", "kcal"))
    fat_col = _find_column(df, ("Fat", "Total Fat"))
    protein_col = _find_column(df, ("Protein",))

    missing = [
        label
        for label, col in (
            ("calories", calorie_col),
            ("fat", fat_col),
            ("protein", protein_col),
        )
        if col is None
    ]
    if missing:
        raise ValueError(
            f"Dataset is missing required nutrient columns: {', '.join(missing)}."
        )

    foods: list[dict[str, Any]] = []
    for row_id in row_ids:
        if row_id < 0 or row_id >= len(df):
            continue
        foods.append(
            {
                "id": row_id,
                "name": get_food_name(df, row_id) or f"Food {row_id}",
                "calories": _numeric(df.iloc[row_id][calorie_col]),
                "fat": _numeric(df.iloc[row_id][fat_col]),
                "protein": _numeric(df.iloc[row_id][protein_col]),
            }
        )

    if not foods:
        raise ValueError("No foods available to optimize. Upload a dataset or add items to the pantry.")

    problem = pulp.LpProblem("HighProteinDiet", pulp.LpMaximize)
    quantities = {
        food["id"]: pulp.LpVariable(f"x_{food['id']}", lowBound=0, cat=pulp.LpContinuous)
        for food in foods
    }

    problem += pulp.lpSum((food["protein"] / 100.0) * quantities[food["id"]] for food in foods)

    problem += (
        pulp.lpSum((food["calories"] / 100.0) * quantities[food["id"]] for food in foods) <= calorie_max,
        "max_calories",
    )
    problem += (
        pulp.lpSum((food["fat"] / 100.0) * quantities[food["id"]] for food in foods) <= fat_max,
        "max_fat",
    )
    problem += (
        pulp.lpSum((food["protein"] / 100.0) * quantities[food["id"]] for food in foods) >= protein_min,
        "min_protein",
    )
    problem += (
        pulp.lpSum(quantities[food["id"]] for food in foods) <= quantity_max,
        "max_quantity",
    )

    status_code = problem.solve(pulp.PULP_CBC_CMD(msg=False))
    status_name = pulp.LpStatus[status_code]
    limits = {
        "calorie_max": calorie_max,
        "fat_max": fat_max,
        "protein_min": protein_min,
        "quantity_max": quantity_max,
    }

    if status_name != "Optimal":
        message = (
            "No feasible high-protein plan exists for these limits. Relax Cmax, Fmax, Qmax, or lower Pmin."
            if status_name == "Infeasible"
            else f"The solver returned status: {status_name}."
        )
        return {
            "status": status_name,
            "message": message,
            "foods": [],
            "totals": {"calories": 0, "protein": 0, "fat": 0, "quantity": 0, "objective_protein": 0},
            "limits": limits,
            "food_count": len(foods),
            "source": source,
        }

    selected = []
    total_calories = 0.0
    total_fat = 0.0
    total_protein = 0.0
    total_quantity = 0.0

    for food in foods:
        xi = float(pulp.value(quantities[food["id"]]) or 0.0)
        if xi < 0.05:
            continue
        calories = (food["calories"] / 100.0) * xi
        fat = (food["fat"] / 100.0) * xi
        protein = (food["protein"] / 100.0) * xi
        total_calories += calories
        total_fat += fat
        total_protein += protein
        total_quantity += xi
        selected.append(
            {
                "id": food["id"],
                "food": food["name"],
                "quantity": round(xi, 2),
                "calories": round(calories, 2),
                "protein": round(protein, 2),
                "fat": round(fat, 2),
                "calories_per_100g": food["calories"],
                "protein_per_100g": food["protein"],
                "fat_per_100g": food["fat"],
            }
        )

    selected.sort(key=lambda item: item["protein"], reverse=True)

    return {
        "status": "Optimal",
        "message": "Optimal high-protein diet found.",
        "foods": selected,
        "totals": {
            "calories": round(total_calories, 2),
            "protein": round(total_protein, 2),
            "fat": round(total_fat, 2),
            "quantity": round(total_quantity, 2),
            "objective_protein": round(float(pulp.value(problem.objective) or total_protein), 2),
        },
        "limits": limits,
        "food_count": len(foods),
        "source": source,
    }
