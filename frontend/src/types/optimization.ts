export type GoalType = 'Weight Loss' | 'Maintenance' | 'Weight Gain'

export type ActivityLevel =
  | 'Sedentary'
  | 'Light'
  | 'Moderate'
  | 'Active'
  | 'Very Active'

export type OptimizationMethod = 'min-cost' | 'max-nutrition'

export interface NutritionTargets {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
}

export interface HighProteinInput {
  calorieMax: number
  fatMax: number
  proteinMin: number
  quantityMax: number
}

export interface HighProteinFoodResult {
  id: number
  food: string
  quantity: number
  calories: number
  protein: number
  fat: number
}

export interface HighProteinResult {
  status: string
  message: string
  foods: HighProteinFoodResult[]
  totals: {
    calories: number
    protein: number
    fat: number
    quantity: number
    objective_protein: number
  }
  limits: {
    calorie_max: number
    fat_max: number
    protein_min: number
    quantity_max: number
  }
  food_count: number
  source: 'dataset' | 'pantry'
}

export interface OptimizationInput {
  age: number
  weightKg: number
  heightCm: number
  goal: GoalType
  activityLevel: ActivityLevel
  dailyBudget: number
  targets: NutritionTargets
}

export interface MealPlanItem {
  food: string
  quantity: string
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  cost: number
}

export interface MealSection {
  meal: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'
  items: MealPlanItem[]
}

export interface OptimizationSummary {
  totalCost: number
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  nutritionScore: number
}

export interface TargetStatus {
  metric: string
  target: number
  actual: number
  unit: string
  withinRange: boolean
}

export interface OptimizationResult {
  id: string
  method: OptimizationMethod
  status: 'Optimal Solution Found' | 'Feasible Solution Found' | 'Infeasible'
  summary: OptimizationSummary
  targetStatus: TargetStatus[]
  meals: MealSection[]
  generatedAt: string
}

export interface OptimizationHistoryRow {
  id: string
  date: string
  method: string
  calories: number
  protein: number
  cost: number
  status: string
}

export interface OptimizationComparison {
  metric: string
  minimumCost: number
  maximumNutrition: number
  unit: string
}

export interface OptimizationProgressStep {
  label: string
  done: boolean
}
