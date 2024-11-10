import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryExerciseMuscleGroupRepository } from '@/repository/in-memory/in-memory-exercise-muscle-group-repository'
import { CreateExerciseMuscleGloupUseCase } from './create-exercise-muscle-group'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { Exercise } from '@prisma/client'


let exerciseMuscleGroupRepository: InMemoryExerciseMuscleGroupRepository
let exerciseRepository: InMemoryExerciseRepository
let sut: CreateExerciseMuscleGloupUseCase

describe('Create exercise muscle group Use Case', () => {

  beforeEach(()=>{
    exerciseMuscleGroupRepository = new InMemoryExerciseMuscleGroupRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    sut = new CreateExerciseMuscleGloupUseCase(exerciseMuscleGroupRepository, exerciseRepository)
  })

  it('should be able to create a exercise muscle group', async () => {
    const exercise: Exercise =({
      name: 'Supino',
      description: 'Supino com peso',
      difficulty: 'BEGINNER',
      requires_equipment: true,
      id_exercise: '123'
     })
     exerciseRepository.items.push(exercise)
  
     const { ExerciseMuscleGroup } = await sut.execute({
      id_exercise: '123',
      id_group: '1234',
     })

     expect(ExerciseMuscleGroup.id_exercise).toEqual(expect.any(String))
     expect(ExerciseMuscleGroup.id_group).toEqual(expect.any(String))
  })
  })