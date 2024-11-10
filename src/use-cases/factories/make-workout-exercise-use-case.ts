import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { PrismaWorkoutExercisesRepository } from '@/repository/prisma/prisma-workout-exercises-repository'
import { CreateWorkoutExerciseUseCase } from '../create-workout-exercise'

export function makeCreateWorkoutExercise() {
  const exerciseWorkoutExerciseRepository = new PrismaWorkoutExercisesRepository()
  const exerciseRepository = new PrismaExerciseRepository()
  const useCase = new CreateWorkoutExerciseUseCase(exerciseWorkoutExerciseRepository, exerciseRepository)

  return useCase
}