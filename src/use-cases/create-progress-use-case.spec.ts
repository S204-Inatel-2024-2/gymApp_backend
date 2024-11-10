import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { InMemoryProgressRepository } from '@/repository/in-memory/in-memory-progress-repository'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { CreateProgressUseCase } from './create-progress-use-case'
import { Exercise, User } from '@prisma/client'


let progressRepository: InMemoryProgressRepository
let exerciseRepository: InMemoryExerciseRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateProgressUseCase

describe('Create progress Use Case', () => {

  beforeEach(()=>{
    progressRepository = new InMemoryProgressRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateProgressUseCase(progressRepository,usersRepository, exerciseRepository)
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
  
     const { progress } = await sut.execute({
      id: 'user-1',
      id_exercise: '123',
      date: new Date(),
      completed_series: 3,
      completed_repetitions: 12,
      used_weight: 20,
      
     })

     expect(progress.id_progress).toEqual(expect.any(String))
     expect(progress.id_exercise).toEqual(expect.any(String))
     expect(progress.id).toEqual(expect.any(String))
     expect(progress.date).toEqual(expect.any(Date))
     expect(progress.completed_series).toEqual(3)
  })
  })