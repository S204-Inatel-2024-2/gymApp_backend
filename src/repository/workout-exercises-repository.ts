import { WorkoutExercise, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
}

export interface WorkoutExerciseRepository {
  create(data: Prisma.WorkoutExerciseUncheckedCreateInput): Promise<WorkoutExercise>
  searchMany(query: string): Promise<WorkoutExercise[]>
}