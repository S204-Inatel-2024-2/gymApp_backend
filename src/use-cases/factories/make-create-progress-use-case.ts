import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { PrismaProgressRepository } from '@/repository/prisma/prisma-progress-repository'
import { PrismaExerciseRepository } from '@/repository/prisma/prisma-exercises-repository'
import { CreateProgressUseCase } from '../create-progress-use-case'

export function makeCreateProgressUseCase() {
  const progressRepository = new PrismaProgressRepository()
  const usersRepository = new PrismaUsersRepository()
  const exerciseRepository = new PrismaExerciseRepository()

  const useCase = new CreateProgressUseCase(progressRepository, usersRepository, exerciseRepository)

  return useCase
}