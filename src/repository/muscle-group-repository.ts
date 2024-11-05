import { MuscleGroup, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
}

export interface MuscleGroupRepository {
  create(data: Prisma.MuscleGroupCreateInput): Promise<MuscleGroup>
}