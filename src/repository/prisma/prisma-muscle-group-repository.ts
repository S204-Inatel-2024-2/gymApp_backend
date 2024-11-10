import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { MuscleGroupRepository } from '../muscle-group-repository'

export class PrismaMuscleGroupRepository implements MuscleGroupRepository {

  async create(data: Prisma.MuscleGroupCreateInput) {
    const musclegroup = await prisma.muscleGroup.create({
      data,
    })

    return musclegroup
  }

  async searchMany(query: string) {
    const muscleGroupRepository = await prisma.muscleGroup.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    })

    return muscleGroupRepository
  }
}