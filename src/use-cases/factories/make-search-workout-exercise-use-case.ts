import { PrismaWorkoutExercisesRepository } from '@/repository/prisma/prisma-workout-exercises-repository'
import { SearchWorkoutExerciseUseCase } from '../search-workout-exercise'

export function makeSearchWorkoutExerciseUseCase() {
  const workoutExerciseRepository = new PrismaWorkoutExercisesRepository()
  const workoutExerciseUseCase = new SearchWorkoutExerciseUseCase(workoutExerciseRepository)

  return workoutExerciseUseCase
}