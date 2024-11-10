import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWorkoutsRepository } from '@/repository/in-memory/in-memory-workouts-reporitory'
import { SearchWorkoutsUseCase } from './search-workout'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { Exercise, User, Workout, WorkoutExercise } from '@prisma/client'
import { SearchWorkoutExerciseUseCase } from './search-workout-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutExercisesRepository } from '@/repository/in-memory/in-memory-workout-exercises-reposirory'

let workoutExerciseRepository: InMemoryWorkoutExercisesRepository
let exerciseRepository: InMemoryExerciseRepository
let sut: SearchWorkoutExerciseUseCase

describe('Search workout exercise Use Case', () => {

  beforeEach(()=>{
    workoutExerciseRepository = new InMemoryWorkoutExercisesRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    sut = new SearchWorkoutExerciseUseCase(workoutExerciseRepository)
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
  
     await workoutExerciseRepository.create({
        id_workout: '123',
        id_exercise: '123',
        series: 3,
        repetitions: 12,
        rest: 120
    })

    const { workoutExercise } = await sut.execute({ query: '123' })

    expect(workoutExercise).toHaveLength(1)
    expect(workoutExercise[0].id_exercise).toEqual('123')
  })
})
