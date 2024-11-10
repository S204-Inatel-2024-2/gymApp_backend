import { PrismaExerciseMuscleGroupRepository } from '@/repository/prisma/prisma-exercise-muscle-group-repository'
import { SearchExerciseMuscleGroupUseCase } from '../search-exercise-muscle-group'

export function makeSearchExerciseMuscleUseCase() {
  const exerciseMuscleRepository = new PrismaExerciseMuscleGroupRepository()
  const exerciseMuscleUseCase = new SearchExerciseMuscleGroupUseCase(exerciseMuscleRepository)

  return exerciseMuscleUseCase
}