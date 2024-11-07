import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { CreateWorkoutUseCase } from './create-workout'
import { User } from '@prisma/client'
import { InMemoryWorkoutsRepository } from '@/repository/in-memory/in-memory-workouts-reporitory'

let workoutsRepository: InMemoryWorkoutsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateWorkoutUseCase

describe('CreateWorkoutUseCase', () => {
  beforeEach(() => {
    workoutsRepository = new InMemoryWorkoutsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateWorkoutUseCase(workoutsRepository, usersRepository)
  })

  it('should be able to create a workout', async () => {
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

    const { Workout } = await sut.execute({
      name: 'Segunda',
      id: 'user-1',
      objective: 'Ganho de massa muscular'
    })

    expect(Workout.id_workout).toEqual(expect.any(String))
    expect(Workout.id).toEqual('user-1')
  })

  it('should throw an error if user does not exist', async () => {
    await expect(sut.execute({
      name: 'Segunda',
      id: 'non-existing-user',
      objective: 'Ganho de massa muscular'
    })).rejects.toThrow()
  })
})
