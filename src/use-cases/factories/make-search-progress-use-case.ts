import { PrismaExerciseMuscleGroupRepository } from '@/repository/prisma/prisma-exercise-muscle-group-repository'
import { SearchExerciseMuscleGroupUseCase } from '../search-exercise-muscle-group'
import { PrismaProgressRepository } from '@/repository/prisma/prisma-progress-repository'
import { SearchProgressUseCase } from '../search-progress-use-case'

export function makeSearchProgressUseCase() {
  const progressRepository = new PrismaProgressRepository()
  const progressUseCase = new SearchProgressUseCase(progressRepository)

  return progressUseCase
}