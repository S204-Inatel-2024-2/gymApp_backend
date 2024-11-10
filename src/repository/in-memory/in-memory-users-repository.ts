import { User, Prisma, Role } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      date_of_birth: new Date(),
      height: data.height,
      weight: data.weight,
      objective: data.objective,
      password_hash: data.password_hash,
      role: Role.MEMBER,
      created_at: new Date(),

    }

    this.items.push(user)

    return user
  }

  async searchMany(query: string) {
    return this.items
      .filter((item) => item.id.includes(query))
  }
}