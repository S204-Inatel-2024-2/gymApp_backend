import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { PrismaExerciseMuscleGroupRepository } from '@/repository/prisma/prisma-exercise-muscle-group-repository'
import { CreateExerciseMuscleGloupUseCase } from '../create-exercise-muscle-group'

export function makeCreateExerciseMuscleGroup() {
  const exerciseMuscleGroupRepository = new PrismaExerciseMuscleGroupRepository()
  const exerciseRepository = new PrismaExerciseRepository()
  const useCase = new CreateExerciseMuscleGloupUseCase(exerciseMuscleGroupRepository, exerciseRepository)

  return useCase
}