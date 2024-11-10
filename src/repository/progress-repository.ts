import { Progress, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
}

export interface ProgressRepository {
  create(data: Prisma.ProgressUncheckedCreateInput): Promise<Progress>
  searchMany(query: string): Promise<Progress[]>
}