import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { WorkoutExerciseRepository } from '../workout-exercises-repository'

export class PrismaWorkoutExercisesRepository implements WorkoutExerciseRepository {

  async create(data: Prisma.WorkoutExerciseUncheckedCreateInput) {
    const workoutExercise = await prisma.workoutExercise.create({
      data,
    })

    return workoutExercise
  }

  async searchMany(query: string) {
    const workoutExerciseRepository = await prisma.workoutExercise.findMany({
      where: {
        id_workout: {
          contains: query,
        },
      },
    })

    return workoutExerciseRepository
  }
}