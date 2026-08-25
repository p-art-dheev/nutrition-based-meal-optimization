export interface DatasetRow {
  id: number;
  in_pantry: boolean;
  values: Record<string, string | number | null>;
}

export interface DatasetRowsResponse {
  columns: string[];
  food_column: string;
  total: number;
  offset: number;
  limit: number;
  rows: DatasetRow[];
}

export interface PantryItem {
  id: number;
  food: string | null;
}

export interface PantryResponse {
  food_column: string;
  count: number;
  items: PantryItem[];
}
