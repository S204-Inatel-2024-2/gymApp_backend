import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { WorkoutsRepository } from '../workouts-repository'

export class PrismaWorkoutRepository implements WorkoutsRepository {

  async create(data: Prisma.WorkoutUncheckedCreateInput) {
    const exercise = await prisma.workout.create({
      data,
    })

    return exercise
  }
}