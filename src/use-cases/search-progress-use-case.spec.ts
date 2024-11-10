import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryProgressRepository } from '@/repository/in-memory/in-memory-progress-repository'
import { SearchProgressUseCase } from './search-progress-use-case'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { Exercise, User } from '@prisma/client'

let progressRepository: InMemoryProgressRepository
let exerciseRepository: InMemoryExerciseRepository
let usersRepository: InMemoryUsersRepository
let sut: SearchProgressUseCase

describe('Create progress Use Case', () => {

  beforeEach(()=>{
    progressRepository = new InMemoryProgressRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new SearchProgressUseCase(progressRepository)
  })

  it('should be able to create a progress', async () => {
    const exercise: Exercise =({
      name: 'Supino',
      description: 'Supino com peso',
      difficulty: 'BEGINNER',
      requires_equipment: true,
      id_exercise: '123'
     })
     exerciseRepository.items.push(exercise)

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

     await progressRepository.create({
        id: 'user-1',
        id_exercise: '123',
        date: new Date(),
        completed_series: 3,
        completed_repetitions: 12,
        used_weight: 20,
    })

    const { progress } = await sut.execute({ query: 'user-1' })


    expect(progress).toHaveLength(1)
    expect(progress[0].id_exercise).toEqual('123')
  })
})
