import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
  
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async searchMany(query: string) {
    const userRepository = await prisma.user.findMany({
      where: {
        id: {
          contains: query,
        },
      },
    })

    return userRepository
  }
}