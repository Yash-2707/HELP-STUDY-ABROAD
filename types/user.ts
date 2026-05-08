export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  age: number
  birthDate: string
  bloodGroup: string
  username: string
  company: {
    department: string
    name: string
    title: string
  }
  image?: string
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
