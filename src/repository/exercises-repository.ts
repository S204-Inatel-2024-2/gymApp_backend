import { Exercise, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
}

export interface ExercisesRepository {
  create(data: Prisma.ExerciseCreateInput): Promise<Exercise>
}