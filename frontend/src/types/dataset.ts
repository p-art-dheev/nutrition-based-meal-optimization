export interface DatasetStatus {
  loaded: boolean
  fileCount: number
  fileNames: string[]
  totalRecords: number
  columnCount: number
  missingValues: number
  duplicateRecords: number
  uploadedAt?: string
}

export interface DataPreviewRow {
  id: number
  food: string
  category: string
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  calcium: number
  iron: number
  potassium: number
  cost: number
}

export interface UploadDatasetResult {
  status: DatasetStatus
  preview: DataPreviewRow[]
}
