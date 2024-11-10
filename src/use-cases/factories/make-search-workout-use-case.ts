import { SearchWorkoutsUseCase } from '../search-workout'
import { PrismaWorkoutRepository } from '@/repository/prisma/prisma-workouts-repository'

export function makeSearchWorkoutUseCase() {
  const workoutRepository = new PrismaWorkoutRepository()
  const workoutUseCase = new SearchWorkoutsUseCase(workoutRepository)

  return workoutUseCase
}