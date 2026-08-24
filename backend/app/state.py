import pandas as pd
from typing import Optional, Set

# Global variable to persist the dataset in memory
global_df: Optional[pd.DataFrame] = None

# Row indices (dataframe index positions) added to the user's pantry
pantry_ids: Set[int] = set()

def reset_pantry() -> None:
    pantry_ids.clear()
