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
}