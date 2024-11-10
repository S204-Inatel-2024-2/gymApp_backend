import { prisma } from '@/lib/prisma'
import {Prisma } from '@prisma/client'
import { ExerciseMuscleGroupRepository } from '../exercise-muscle-group-repository'

export class PrismaExerciseMuscleGroupRepository implements ExerciseMuscleGroupRepository {

  async create(data: Prisma.ExerciseMuscleGroupUncheckedCreateInput) {
    const workoutExercise = await prisma.exerciseMuscleGroup.create({
      data,
    })

    return workoutExercise
  }

  async searchMany(query: string) {
    const exerciseMuscleGroupRepository = await prisma.exerciseMuscleGroup.findMany({
      where: {
        id_exercise: {
          contains: query,
        },
      },
    })

    return exerciseMuscleGroupRepository
  }

}