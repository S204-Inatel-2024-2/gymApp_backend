import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { SearchExercisesUseCase } from '../search-exercise'

export function makeSearchExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const exerciseUseCase = new SearchExercisesUseCase(exerciseRepository)

  return exerciseUseCase
}