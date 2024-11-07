import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { CreateExerciseUseCase } from '../create-exercise'

export function makeCreateExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const useCase = new CreateExerciseUseCase(exerciseRepository)

  return useCase
}