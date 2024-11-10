import { expect, describe, it, beforeEach } from 'vitest'
import { CreateWorkoutExerciseUseCase } from './create-workout-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutExercisesRepository } from '@/repository/in-memory/in-memory-workout-exercises-reposirory'
import { Exercise } from '@prisma/client'



let workoutExerciseRepository: InMemoryWorkoutExercisesRepository
let exerciseRepository: InMemoryExerciseRepository
let sut: CreateWorkoutExerciseUseCase

describe('Create workout exercise Use Case', () => {

  beforeEach(()=>{
    workoutExerciseRepository = new InMemoryWorkoutExercisesRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    sut = new CreateWorkoutExerciseUseCase(workoutExerciseRepository, exerciseRepository)
  })

  it('should be able to create a workout exercise', async () => {

   const exercise: Exercise =({
      name: 'Supino',
      description: 'Supino com peso',
      difficulty: 'BEGINNER',
      requires_equipment: true,
      id_exercise: '123'
     })
     exerciseRepository.items.push(exercise)
  
     const { WorkoutExercise } = await sut.execute({
        id_workout: '123',
        id_exercise: '123',
        series: 3,
        repetitions: 12,
        rest: 120
     })

     expect(WorkoutExercise.id_workout).toEqual(expect.any(String))
     expect(WorkoutExercise.series).toEqual(3)
  })
  })