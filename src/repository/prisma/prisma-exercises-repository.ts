import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { ExercisesRepository } from '../exercises-repository'

export class PrismaExerciseRepository implements ExercisesRepository {

  async create(data: Prisma.ExerciseCreateInput) {
    const exercise = await prisma.exercise.create({
      data,
    })

    return exercise
  }

  async findById(id_exercise: string) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id_exercise,
      },
    })

    return exercise
  }

  async searchMany(query: string) {
    const exerciseRepository = await prisma.exercise.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    })

    return exerciseRepository
  }
}