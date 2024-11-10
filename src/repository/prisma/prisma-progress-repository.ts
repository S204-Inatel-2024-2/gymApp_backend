import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { ProgressRepository } from '../progress-repository'

export class PrismaProgressRepository implements ProgressRepository {

  async create(data: Prisma.ProgressUncheckedCreateInput) {
    const progress = await prisma.progress.create({
      data,
    })

    return progress
  }

  async searchMany(query: string) {
    const progressRepository = await prisma.progress.findMany({
      where: {
        id: {
          contains: query,
        },
      },
    })

    return progressRepository
  }
}