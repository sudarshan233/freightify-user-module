export type User = {
  id?: string
  name: string
  email: string
  role: string
  createdAt: string
  status: "Active" | "Inactive"
}

export type Response = {
  id: string
  userType: string
  userRole: string
  firstName: string
  lastName: string
  phoneNumber: number
  email: string
  password: string
  confirmPassword: string
  userCurrency: string
  numberFormat: string
  measurementSystem: string
  decimalPlaces: number
  userStatus: boolean
  userTeam: string[]
  createdAt: Date
  updatedAt: Date
}

export type FilterType = {
  userType?: string,
  userRole?: string,
  userStatus?: boolean
  search?: string
}

export interface CustomErrorHandler {
  errorStatus: boolean,
  errorLocation: string[]
}