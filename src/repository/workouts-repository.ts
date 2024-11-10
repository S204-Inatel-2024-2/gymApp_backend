import { Exercise, Prisma, Workout } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
  objective: string
}

export interface WorkoutsRepository {
  create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
  searchMany(query: string): Promise<Workout[]>
}