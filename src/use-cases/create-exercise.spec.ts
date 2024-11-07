import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { CreateExerciseUseCase } from './create-exercise'


let exerciseRepository: InMemoryExerciseRepository
let sut: CreateExerciseUseCase

describe('Create exercises Use Case', () => {

  beforeEach(()=>{
    exerciseRepository = new InMemoryExerciseRepository()
    sut = new CreateExerciseUseCase(exerciseRepository)
  })

  it('should be able to create a exercises', async () => {
  
     const { Exercise } = await sut.execute({
      name: 'Supino',
      description: 'Supino com peso',
      difficulty: 'BEGINNER',
      requires_equipment: true,
     })

     expect(Exercise.id_exercise).toEqual(expect.any(String))
     expect(Exercise.name).toEqual('Supino')
  })
  })