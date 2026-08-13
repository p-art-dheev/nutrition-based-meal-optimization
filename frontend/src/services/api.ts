import type { DataPreviewRow, DatasetStatus, UploadDatasetResult } from '../types/dataset'
import type {
  AttributeStatistics,
  CorrelationCell,
  DatasetOverviewStats,
  DistributionPoint,
  FoodComparisonRow,
  NutritionAttribute,
  TopFoodItem,
} from '../types/nutrition'
import type {
  GoalType,
  OptimizationComparison,
  OptimizationHistoryRow,
  OptimizationInput,
  OptimizationMethod,
  OptimizationResult,
  NutritionTargets,
} from '../types/optimization'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const delay = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const expectedFiles = [
  'FOOD-DATA-GROUP1.csv',
  'FOOD-DATA-GROUP2.csv',
  'FOOD-DATA-GROUP3.csv',
  'FOOD-DATA-GROUP4.csv',
  'FOOD-DATA-GROUP5.csv',
]

const mockPreview: DataPreviewRow[] = [
  {
    id: 1,
    food: 'Oats',
    category: 'Cereal',
    calories: 389,
    protein: 16.9,
    carbohydrates: 66.3,
    fat: 6.9,
    fiber: 10.6,
    sugar: 0.9,
    sodium: 2,
    calcium: 54,
    iron: 4.7,
    potassium: 429,
    cost: 18,
  },
  {
    id: 2,
    food: 'Milk',
    category: 'Dairy',
    calories: 61,
    protein: 3.2,
    carbohydrates: 4.8,
    fat: 3.3,
    fiber: 0,
    sugar: 5,
    sodium: 43,
    calcium: 113,
    iron: 0,
    potassium: 132,
    cost: 25,
  },
  {
    id: 3,
    food: 'Banana',
    category: 'Fruit',
    calories: 89,
    protein: 1.1,
    carbohydrates: 22.8,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    sodium: 1,
    calcium: 5,
    iron: 0.3,
    potassium: 358,
    cost: 8,
  },
  {
    id: 4,
    food: 'Brown Rice',
    category: 'Grain',
    calories: 123,
    protein: 2.7,
    carbohydrates: 25.6,
    fat: 1,
    fiber: 1.6,
    sugar: 0.4,
    sodium: 4,
    calcium: 10,
    iron: 0.4,
    potassium: 86,
    cost: 14,
  },
  {
    id: 5,
    food: 'Chicken Breast',
    category: 'Protein',
    calories: 165,
    protein: 31,
    carbohydrates: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    calcium: 15,
    iron: 1,
    potassium: 256,
    cost: 58,
  },
  {
    id: 6,
    food: 'Spinach',
    category: 'Vegetable',
    calories: 23,
    protein: 2.9,
    carbohydrates: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    calcium: 99,
    iron: 2.7,
    potassium: 558,
    cost: 16,
  },
  {
    id: 7,
    food: 'Paneer',
    category: 'Dairy',
    calories: 265,
    protein: 18.3,
    carbohydrates: 1.2,
    fat: 20.8,
    fiber: 0,
    sugar: 0,
    sodium: 22,
    calcium: 208,
    iron: 0.2,
    potassium: 104,
    cost: 65,
  },
  {
    id: 8,
    food: 'Lentils',
    category: 'Legume',
    calories: 116,
    protein: 9,
    carbohydrates: 20.1,
    fat: 0.4,
    fiber: 7.9,
    sugar: 1.8,
    sodium: 2,
    calcium: 19,
    iron: 3.3,
    potassium: 369,
    cost: 22,
  },
  {
    id: 9,
    food: 'Almonds',
    category: 'Nuts',
    calories: 579,
    protein: 21.2,
    carbohydrates: 21.6,
    fat: 49.9,
    fiber: 12.5,
    sugar: 4.4,
    sodium: 1,
    calcium: 269,
    iron: 3.7,
    potassium: 733,
    cost: 75,
  },
  {
    id: 10,
    food: 'Egg',
    category: 'Protein',
    calories: 155,
    protein: 13,
    carbohydrates: 1.1,
    fat: 11,
    fiber: 0,
    sugar: 1.1,
    sodium: 124,
    calcium: 50,
    iron: 1.2,
    potassium: 126,
    cost: 12,
  },
]

const baseStatus: DatasetStatus = {
  loaded: true,
  fileCount: 5,
  fileNames: expectedFiles,
  totalRecords: 2395,
  columnCount: 37,
  missingValues: 48,
  duplicateRecords: 3,
  uploadedAt: new Date().toISOString(),
}

const datasetOverviewStats: DatasetOverviewStats = {
  foods: 2395,
  nutritionFeatures: 37,
  missingValues: 48,
  duplicateRecords: 3,
  averageCalories: 182.4,
  averageProtein: 12.7,
  averageCarbohydrates: 19.3,
  averageFat: 8.9,
}

const descriptiveStats: Record<NutritionAttribute, AttributeStatistics> = {
  Calories: {
    attribute: 'Calories',
    count: 2395,
    mean: 182.4,
    median: 145,
    stdDev: 126.2,
    min: 0,
    max: 910,
    q1: 83,
    q3: 241,
    unit: 'kcal',
  },
  Protein: {
    attribute: 'Protein',
    count: 2395,
    mean: 18.42,
    median: 12.3,
    stdDev: 21.18,
    min: 0,
    max: 560.3,
    q1: 4.7,
    q3: 27.4,
    unit: 'g',
  },
  Fat: {
    attribute: 'Fat',
    count: 2395,
    mean: 8.9,
    median: 5.4,
    stdDev: 12.2,
    min: 0,
    max: 100,
    q1: 1.2,
    q3: 11.6,
    unit: 'g',
  },
  Carbohydrates: {
    attribute: 'Carbohydrates',
    count: 2395,
    mean: 19.3,
    median: 14.6,
    stdDev: 17.9,
    min: 0,
    max: 99,
    q1: 4.4,
    q3: 29.8,
    unit: 'g',
  },
  'Dietary Fiber': {
    attribute: 'Dietary Fiber',
    count: 2395,
    mean: 3.9,
    median: 2.1,
    stdDev: 4.7,
    min: 0,
    max: 52,
    q1: 0.4,
    q3: 5.2,
    unit: 'g',
  },
  Sugar: {
    attribute: 'Sugar',
    count: 2395,
    mean: 5.8,
    median: 2.7,
    stdDev: 8.1,
    min: 0,
    max: 74,
    q1: 0.5,
    q3: 8.6,
    unit: 'g',
  },
  Sodium: {
    attribute: 'Sodium',
    count: 2395,
    mean: 187,
    median: 122,
    stdDev: 211,
    min: 0,
    max: 2130,
    q1: 34,
    q3: 254,
    unit: 'mg',
  },
  Calcium: {
    attribute: 'Calcium',
    count: 2395,
    mean: 94,
    median: 52,
    stdDev: 112,
    min: 0,
    max: 1200,
    q1: 16,
    q3: 123,
    unit: 'mg',
  },
  Iron: {
    attribute: 'Iron',
    count: 2395,
    mean: 2.4,
    median: 1.2,
    stdDev: 3.1,
    min: 0,
    max: 38.6,
    q1: 0.3,
    q3: 3.2,
    unit: 'mg',
  },
  Potassium: {
    attribute: 'Potassium',
    count: 2395,
    mean: 278,
    median: 213,
    stdDev: 244,
    min: 0,
    max: 2300,
    q1: 92,
    q3: 384,
    unit: 'mg',
  },
}

const distributions: Record<string, DistributionPoint[]> = {
  Calories: [
    { bin: '0-100', value: 580 },
    { bin: '101-200', value: 710 },
    { bin: '201-300', value: 510 },
    { bin: '301-400', value: 330 },
    { bin: '401-500', value: 175 },
    { bin: '500+', value: 90 },
  ],
  Protein: [
    { bin: '0-5', value: 620 },
    { bin: '6-15', value: 740 },
    { bin: '16-25', value: 530 },
    { bin: '26-35', value: 310 },
    { bin: '36-45', value: 125 },
    { bin: '45+', value: 70 },
  ],
  Fat: [
    { bin: '0-5', value: 910 },
    { bin: '6-15', value: 760 },
    { bin: '16-25', value: 450 },
    { bin: '26-35', value: 180 },
    { bin: '36-45', value: 70 },
    { bin: '45+', value: 25 },
  ],
  Carbohydrates: [
    { bin: '0-10', value: 700 },
    { bin: '11-20', value: 690 },
    { bin: '21-30', value: 530 },
    { bin: '31-40', value: 290 },
    { bin: '41-50', value: 120 },
    { bin: '50+', value: 65 },
  ],
  Fiber: [
    { bin: '0-2', value: 930 },
    { bin: '3-5', value: 750 },
    { bin: '6-8', value: 390 },
    { bin: '9-11', value: 200 },
    { bin: '12-14', value: 85 },
    { bin: '14+', value: 40 },
  ],
}

const correlationMatrix: CorrelationCell[] = [
  { x: 'Calories', y: 'Calories', value: 1 },
  { x: 'Calories', y: 'Protein', value: 0.39 },
  { x: 'Calories', y: 'Fat', value: 0.62 },
  { x: 'Calories', y: 'Carbohydrates', value: 0.48 },
  { x: 'Calories', y: 'Sugar', value: 0.31 },
  { x: 'Calories', y: 'Fiber', value: 0.22 },
  { x: 'Protein', y: 'Calories', value: 0.39 },
  { x: 'Protein', y: 'Protein', value: 1 },
  { x: 'Protein', y: 'Fat', value: 0.33 },
  { x: 'Protein', y: 'Carbohydrates', value: -0.08 },
  { x: 'Protein', y: 'Sugar', value: -0.14 },
  { x: 'Protein', y: 'Fiber', value: 0.2 },
  { x: 'Fat', y: 'Calories', value: 0.62 },
  { x: 'Fat', y: 'Protein', value: 0.33 },
  { x: 'Fat', y: 'Fat', value: 1 },
  { x: 'Fat', y: 'Carbohydrates', value: -0.03 },
  { x: 'Fat', y: 'Sugar', value: 0.07 },
  { x: 'Fat', y: 'Fiber', value: 0.06 },
  { x: 'Carbohydrates', y: 'Calories', value: 0.48 },
  { x: 'Carbohydrates', y: 'Protein', value: -0.08 },
  { x: 'Carbohydrates', y: 'Fat', value: -0.03 },
  { x: 'Carbohydrates', y: 'Carbohydrates', value: 1 },
  { x: 'Carbohydrates', y: 'Sugar', value: 0.63 },
  { x: 'Carbohydrates', y: 'Fiber', value: 0.44 },
  { x: 'Sugar', y: 'Calories', value: 0.31 },
  { x: 'Sugar', y: 'Protein', value: -0.14 },
  { x: 'Sugar', y: 'Fat', value: 0.07 },
  { x: 'Sugar', y: 'Carbohydrates', value: 0.63 },
  { x: 'Sugar', y: 'Sugar', value: 1 },
  { x: 'Sugar', y: 'Fiber', value: 0.09 },
  { x: 'Fiber', y: 'Calories', value: 0.22 },
  { x: 'Fiber', y: 'Protein', value: 0.2 },
  { x: 'Fiber', y: 'Fat', value: 0.06 },
  { x: 'Fiber', y: 'Carbohydrates', value: 0.44 },
  { x: 'Fiber', y: 'Sugar', value: 0.09 },
  { x: 'Fiber', y: 'Fiber', value: 1 },
]

const topFoodsData: Record<string, TopFoodItem[]> = {
  Protein: [
    { food: 'Soy Chunks', category: 'Plant Protein', value: 52.4, cost: 45 },
    { food: 'Chicken Breast', category: 'Protein', value: 31, cost: 58 },
    { food: 'Tuna', category: 'Seafood', value: 29.1, cost: 88 },
    { food: 'Paneer', category: 'Dairy', value: 18.3, cost: 65 },
    { food: 'Lentils', category: 'Legume', value: 9, cost: 22 },
  ],
  Calories: [
    { food: 'Ghee', category: 'Fat', value: 900, cost: 70 },
    { food: 'Almonds', category: 'Nuts', value: 579, cost: 75 },
    { food: 'Peanut Butter', category: 'Spread', value: 588, cost: 48 },
    { food: 'Granola', category: 'Cereal', value: 471, cost: 40 },
    { food: 'Paneer', category: 'Dairy', value: 265, cost: 65 },
  ],
  Fiber: [
    { food: 'Chia Seeds', category: 'Seeds', value: 34.4, cost: 95 },
    { food: 'Flaxseeds', category: 'Seeds', value: 27.3, cost: 60 },
    { food: 'Almonds', category: 'Nuts', value: 12.5, cost: 75 },
    { food: 'Oats', category: 'Cereal', value: 10.6, cost: 18 },
    { food: 'Lentils', category: 'Legume', value: 7.9, cost: 22 },
  ],
  Calcium: [
    { food: 'Sesame Seeds', category: 'Seeds', value: 975, cost: 42 },
    { food: 'Paneer', category: 'Dairy', value: 208, cost: 65 },
    { food: 'Almonds', category: 'Nuts', value: 269, cost: 75 },
    { food: 'Spinach', category: 'Vegetable', value: 99, cost: 16 },
    { food: 'Milk', category: 'Dairy', value: 113, cost: 25 },
  ],
  Iron: [
    { food: 'Soy Chunks', category: 'Plant Protein', value: 15.7, cost: 45 },
    { food: 'Pumpkin Seeds', category: 'Seeds', value: 8.8, cost: 52 },
    { food: 'Lentils', category: 'Legume', value: 3.3, cost: 22 },
    { food: 'Spinach', category: 'Vegetable', value: 2.7, cost: 16 },
    { food: 'Oats', category: 'Cereal', value: 4.7, cost: 18 },
  ],
  Potassium: [
    { food: 'Potato', category: 'Vegetable', value: 425, cost: 12 },
    { food: 'Banana', category: 'Fruit', value: 358, cost: 8 },
    { food: 'Spinach', category: 'Vegetable', value: 558, cost: 16 },
    { food: 'Lentils', category: 'Legume', value: 369, cost: 22 },
    { food: 'Almonds', category: 'Nuts', value: 733, cost: 75 },
  ],
  'Nutrition Density': [
    { food: 'Spinach', category: 'Vegetable', value: 92, cost: 16 },
    { food: 'Lentils', category: 'Legume', value: 89, cost: 22 },
    { food: 'Oats', category: 'Cereal', value: 86, cost: 18 },
    { food: 'Yogurt', category: 'Dairy', value: 84, cost: 20 },
    { food: 'Egg', category: 'Protein', value: 82, cost: 12 },
  ],
}

const foodComparisonRows: FoodComparisonRow[] = [
  {
    name: 'Oats',
    calories: 389,
    protein: 16.9,
    carbohydrates: 66.3,
    fat: 6.9,
    fiber: 10.6,
    sugar: 0.9,
    calcium: 54,
    iron: 4.7,
    potassium: 429,
    nutritionDensity: 86,
  },
  {
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbohydrates: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    calcium: 15,
    iron: 1,
    potassium: 256,
    nutritionDensity: 78,
  },
  {
    name: 'Lentils',
    calories: 116,
    protein: 9,
    carbohydrates: 20.1,
    fat: 0.4,
    fiber: 7.9,
    sugar: 1.8,
    calcium: 19,
    iron: 3.3,
    potassium: 369,
    nutritionDensity: 89,
  },
  {
    name: 'Spinach',
    calories: 23,
    protein: 2.9,
    carbohydrates: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    calcium: 99,
    iron: 2.7,
    potassium: 558,
    nutritionDensity: 92,
  },
]

const baseTargets: NutritionTargets = {
  calories: 2200,
  protein: 140,
  carbohydrates: 280,
  fat: 70,
  fiber: 30,
}

const minCostResult: OptimizationResult = {
  id: 'opt-min-001',
  method: 'min-cost',
  status: 'Optimal Solution Found',
  generatedAt: new Date().toISOString(),
  summary: {
    totalCost: 286,
    calories: 2184,
    protein: 142,
    carbohydrates: 278,
    fat: 68,
    fiber: 31,
    nutritionScore: 84,
  },
  targetStatus: [
    { metric: 'Calories', target: 2200, actual: 2184, unit: 'kcal', withinRange: true },
    { metric: 'Protein', target: 140, actual: 142, unit: 'g', withinRange: true },
    { metric: 'Carbohydrates', target: 280, actual: 278, unit: 'g', withinRange: true },
    { metric: 'Fat', target: 70, actual: 68, unit: 'g', withinRange: true },
    { metric: 'Fiber', target: 30, actual: 31, unit: 'g', withinRange: true },
  ],
  meals: [
    {
      meal: 'Breakfast',
      items: [
        { food: 'Oats', quantity: '80 g', calories: 311, protein: 13.5, carbohydrates: 53, fat: 5.5, fiber: 8.5, cost: 14 },
        { food: 'Milk', quantity: '250 ml', calories: 152, protein: 8, carbohydrates: 12, fat: 8.2, fiber: 0, cost: 25 },
        { food: 'Banana', quantity: '1 medium', calories: 105, protein: 1.3, carbohydrates: 27, fat: 0.3, fiber: 3.1, cost: 8 },
      ],
    },
    {
      meal: 'Lunch',
      items: [
        { food: 'Brown Rice', quantity: '250 g', calories: 307, protein: 6.8, carbohydrates: 64, fat: 2.5, fiber: 4, cost: 28 },
        { food: 'Chicken Breast', quantity: '150 g', calories: 248, protein: 46, carbohydrates: 0, fat: 5.4, fiber: 0, cost: 87 },
        { food: 'Vegetables', quantity: '150 g', calories: 90, protein: 4.2, carbohydrates: 17.5, fat: 0.9, fiber: 5.1, cost: 18 },
      ],
    },
    {
      meal: 'Snack',
      items: [
        { food: 'Yogurt', quantity: '200 g', calories: 118, protein: 10.2, carbohydrates: 8.8, fat: 4.5, fiber: 0, cost: 20 },
        { food: 'Almonds', quantity: '20 g', calories: 116, protein: 4.2, carbohydrates: 4.3, fat: 10, fiber: 2.5, cost: 15 },
      ],
    },
    {
      meal: 'Dinner',
      items: [
        { food: 'Lentils', quantity: '220 g', calories: 255, protein: 19.8, carbohydrates: 44, fat: 0.9, fiber: 17, cost: 48 },
        { food: 'Paneer', quantity: '90 g', calories: 238, protein: 16.5, carbohydrates: 1.2, fat: 18.7, fiber: 0, cost: 58 },
        { food: 'Salad Mix', quantity: '200 g', calories: 44, protein: 3.5, carbohydrates: 6.2, fat: 0.8, fiber: 3.3, cost: 13 },
      ],
    },
  ],
}

const maxNutritionResult: OptimizationResult = {
  ...minCostResult,
  id: 'opt-max-001',
  method: 'max-nutrition',
  summary: {
    totalCost: 338,
    calories: 2210,
    protein: 154,
    carbohydrates: 271,
    fat: 69,
    fiber: 38,
    nutritionScore: 93,
  },
}

const historyRows: OptimizationHistoryRow[] = [
  {
    id: 'hist-1',
    date: '2026-08-10 09:35',
    method: 'Minimum Cost Optimization',
    calories: 2188,
    protein: 139,
    cost: 292,
    status: 'Optimal Solution Found',
  },
  {
    id: 'hist-2',
    date: '2026-08-11 11:12',
    method: 'Maximum Nutrition Optimization',
    calories: 2203,
    protein: 149,
    cost: 344,
    status: 'Optimal Solution Found',
  },
  {
    id: 'hist-3',
    date: '2026-08-13 14:05',
    method: 'Minimum Cost Optimization',
    calories: 2179,
    protein: 141,
    cost: 286,
    status: 'Optimal Solution Found',
  },
]

const comparisonRows: OptimizationComparison[] = [
  { metric: 'Calories', minimumCost: 2184, maximumNutrition: 2210, unit: 'kcal' },
  { metric: 'Protein', minimumCost: 142, maximumNutrition: 154, unit: 'g' },
  { metric: 'Carbohydrates', minimumCost: 278, maximumNutrition: 271, unit: 'g' },
  { metric: 'Fat', minimumCost: 68, maximumNutrition: 69, unit: 'g' },
  { metric: 'Fiber', minimumCost: 31, maximumNutrition: 38, unit: 'g' },
  { metric: 'Cost', minimumCost: 286, maximumNutrition: 338, unit: 'INR' },
  { metric: 'Nutrition Score', minimumCost: 84, maximumNutrition: 93, unit: 'score' },
]

const postFormData = async <T>(path: string, formData: FormData): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

const postJson = async <T>(path: string, payload: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export const uploadDataset = async (files: File[]): Promise<UploadDatasetResult> => {
  if (USE_MOCK) {
    await delay(700)

    const selectedNames = files.map((file) => file.name)
    const hasExpected = expectedFiles.every((name) => selectedNames.includes(name))
    const status = {
      ...baseStatus,
      loaded: files.length > 0,
      fileCount: files.length,
      fileNames: selectedNames,
      uploadedAt: new Date().toISOString(),
      totalRecords: hasExpected ? 2395 : Math.max(250, files.length * 420),
      columnCount: hasExpected ? 37 : 30,
      missingValues: hasExpected ? 48 : 67,
      duplicateRecords: hasExpected ? 3 : 6,
    }

    return { status, preview: mockPreview }
  }

  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))
  return postFormData<UploadDatasetResult>('/api/data/upload', formData)
}

export const getDatasetStatistics = async (): Promise<DatasetOverviewStats> => {
  if (USE_MOCK) {
    await delay(350)
    return datasetOverviewStats
  }

  return getJson<DatasetOverviewStats>('/api/data/statistics')
}

export const getDescriptiveStatistics = async (
  attribute: NutritionAttribute,
): Promise<AttributeStatistics> => {
  if (USE_MOCK) {
    await delay(300)
    return descriptiveStats[attribute]
  }

  return getJson<AttributeStatistics>(`/api/statistics/descriptive?attribute=${encodeURIComponent(attribute)}`)
}

export const getNutritionDistribution = async (attribute: string): Promise<DistributionPoint[]> => {
  if (USE_MOCK) {
    await delay(320)
    return distributions[attribute] ?? distributions.Calories
  }

  return getJson<DistributionPoint[]>(`/api/statistics/distribution?attribute=${encodeURIComponent(attribute)}`)
}

export const getCorrelationMatrix = async (): Promise<CorrelationCell[]> => {
  if (USE_MOCK) {
    await delay(340)
    return correlationMatrix
  }

  return getJson<CorrelationCell[]>('/api/statistics/correlation')
}

export const getTopFoods = async (rankBy: string, limit: number): Promise<TopFoodItem[]> => {
  if (USE_MOCK) {
    await delay(360)
    return (topFoodsData[rankBy] ?? topFoodsData.Protein).slice(0, limit)
  }

  return getJson<TopFoodItem[]>(`/api/statistics/top-foods?rankBy=${encodeURIComponent(rankBy)}&limit=${limit}`)
}

export const compareFoods = async (foods: string[]): Promise<FoodComparisonRow[]> => {
  if (USE_MOCK) {
    await delay(350)
    const fallback = foodComparisonRows.slice(0, 2)
    if (!foods.length) {
      return fallback
    }

    const rows = foodComparisonRows.filter((item) => foods.includes(item.name))
    return rows.length ? rows : fallback
  }

  return postJson<FoodComparisonRow[]>('/api/statistics/compare-foods', { foods })
}

export const calculateNutritionTargets = async (
  age: number,
  weightKg: number,
  heightCm: number,
  goal: GoalType,
): Promise<NutritionTargets> => {
  if (USE_MOCK) {
    await delay(350)

    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    const goalFactor = goal === 'Weight Loss' ? 0.88 : goal === 'Weight Gain' ? 1.12 : 1
    const calories = Math.round(bmr * 1.55 * goalFactor)

    return {
      calories,
      protein: Math.round(weightKg * (goal === 'Weight Gain' ? 2.1 : 1.8)),
      carbohydrates: Math.round((calories * 0.5) / 4),
      fat: Math.round((calories * 0.28) / 9),
      fiber: 30,
    }
  }

  return postJson<NutritionTargets>('/api/nutrition/targets', { age, weightKg, heightCm, goal })
}

const runOptimizationMock = async (method: OptimizationMethod): Promise<OptimizationResult> => {
  await delay(1500)
  return method === 'min-cost'
    ? { ...minCostResult, generatedAt: new Date().toISOString() }
    : { ...maxNutritionResult, generatedAt: new Date().toISOString() }
}

export const runMinCostOptimization = async (
  input: OptimizationInput,
): Promise<OptimizationResult> => {
  if (USE_MOCK) {
    return runOptimizationMock('min-cost')
  }

  return postJson<OptimizationResult>('/api/optimization/min-cost', input)
}

export const runMaxNutritionOptimization = async (
  input: OptimizationInput,
): Promise<OptimizationResult> => {
  if (USE_MOCK) {
    return runOptimizationMock('max-nutrition')
  }

  return postJson<OptimizationResult>('/api/optimization/max-nutrition', input)
}

export const getOptimizationComparison = async (): Promise<OptimizationComparison[]> => {
  if (USE_MOCK) {
    await delay(260)
    return comparisonRows
  }

  return getJson<OptimizationComparison[]>('/api/optimization/compare')
}

export const getOptimizationHistory = async (): Promise<OptimizationHistoryRow[]> => {
  if (USE_MOCK) {
    await delay(280)
    return historyRows
  }

  return getJson<OptimizationHistoryRow[]>('/api/meal-plans')
}
