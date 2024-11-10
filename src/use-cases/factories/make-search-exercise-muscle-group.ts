import { PrismaExerciseMuscleGroupRepository } from '@/repository/prisma/prisma-exercise-muscle-group-repository'
import { SearchExerciseMuscleGroupUseCase } from '../search-exercise-muscle-group'

export function makeSearchExerciseMuscleGroupUseCase() {
  const exerciseMuscleGroupRepository = new PrismaExerciseMuscleGroupRepository()
  const exerciseMuscleGroupUseCase = new SearchExerciseMuscleGroupUseCase(exerciseMuscleGroupRepository)

  return exerciseMuscleGroupUseCase
}