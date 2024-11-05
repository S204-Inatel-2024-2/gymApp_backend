import { PrismaMuscleGroupRepository } from '@/repository/prisma/prisma-muscle-group-repository'
import { CreateMuscleGroupUseCase } from '../create-muscle-group'

export function makeCreateMuscleGroupUseCase() {
  const muscleGroupsRepository = new PrismaMuscleGroupRepository()
  const useCase = new CreateMuscleGroupUseCase(muscleGroupsRepository)

  return useCase
}