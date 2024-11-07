import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { CreateWorkoutUseCase } from '../create-workout'
import { PrismaWorkoutRepository } from '@/repository/prisma/prisma-workouts-repository'

export function makeCreateWorkoutUseCase() {
  const workoutRepository = new PrismaWorkoutRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateWorkoutUseCase(workoutRepository, usersRepository)

  return useCase
}