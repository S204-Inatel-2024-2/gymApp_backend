import { ExerciseMuscleGroup, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  name: string
}

export interface ExerciseMuscleGroupRepository {
  create(data: Prisma.ExerciseMuscleGroupUncheckedCreateInput): Promise<{ id_exercise: string; id_group: string; }>
  searchMany(query: string): Promise<ExerciseMuscleGroup[]>
}