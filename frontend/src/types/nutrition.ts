export type NutritionAttribute =
  | 'Calories'
  | 'Protein'
  | 'Fat'
  | 'Carbohydrates'
  | 'Dietary Fiber'
  | 'Sugar'
  | 'Sodium'
  | 'Calcium'
  | 'Iron'
  | 'Potassium'

export interface DatasetOverviewStats {
  foods: number
  nutritionFeatures: number
  missingValues: number
  duplicateRecords: number
  averageCalories: number
  averageProtein: number
  averageCarbohydrates: number
  averageFat: number
}

export interface AttributeStatistics {
  attribute: NutritionAttribute
  count: number
  mean: number
  median: number
  stdDev: number
  min: number
  max: number
  q1: number
  q3: number
  unit: string
}

export interface DistributionPoint {
  bin: string
  value: number
}

export interface CorrelationCell {
  x: string
  y: string
  value: number
}

export interface TopFoodItem {
  food: string
  category: string
  value: number
  cost: number
}

export interface FoodComparisonRow {
  name: string
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  sugar: number
  calcium: number
  iron: number
  potassium: number
  nutritionDensity: number
}
