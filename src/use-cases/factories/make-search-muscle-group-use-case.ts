import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { SearchExercisesUseCase } from '../search-exercise'
import { SearchMuscleGroupUseCase } from '../search-muscle-group'
import { PrismaMuscleGroupRepository } from '@/repository/prisma/prisma-muscle-group-repository'

export function makeSearchMuscleGroupUseCase() {
  const muscleGroupRepository = new PrismaMuscleGroupRepository()
  const muscleGroupUseCase = new SearchMuscleGroupUseCase(muscleGroupRepository)

  return muscleGroupUseCase
}