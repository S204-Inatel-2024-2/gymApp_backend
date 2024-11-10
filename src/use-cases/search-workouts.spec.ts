import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWorkoutsRepository } from '@/repository/in-memory/in-memory-workouts-reporitory'
import { SearchWorkoutsUseCase } from './search-workout'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { User } from '@prisma/client'

let workoutsRepository: InMemoryWorkoutsRepository
let usersRepository: InMemoryUsersRepository
let sut: SearchWorkoutsUseCase

describe('Search Workouts Use Case', () => {
  beforeEach(() => {
    workoutsRepository = new InMemoryWorkoutsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new SearchWorkoutsUseCase(workoutsRepository)
  })

  it('should be able to search for exercises by name', async () => {
    const user: User = { 
        id: 'user-1', 
        name: 'Test User', 
        email: 'test@example.com', 
        password_hash: 'hash', 
        date_of_birth: new Date(), 
        role: 'MEMBER', 
        height: '180cm', 
        weight: '75kg', 
        objective: 'Ganho de massa' 
    }
    usersRepository.items.push(user)

    await workoutsRepository.create({
        name: 'Segunda',
        id: 'user-1',
        objective: 'Ganho de massa muscular'
    })

    const { workouts } = await sut.execute({ query: 'Segunda' })

    expect(workouts).toHaveLength(1)
    expect(workouts[0].name).toEqual('Segunda')
  })
})
