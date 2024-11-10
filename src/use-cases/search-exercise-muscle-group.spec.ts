import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWorkoutsRepository } from '@/repository/in-memory/in-memory-workouts-reporitory'
import { SearchWorkoutsUseCase } from './search-workout'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { Exercise, User, Workout, WorkoutExercise } from '@prisma/client'
import { SearchWorkoutExerciseUseCase } from './search-workout-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutExercisesRepository } from '@/repository/in-memory/in-memory-workout-exercises-reposirory'
import { InMemoryExerciseMuscleGroupRepository } from '@/repository/in-memory/in-memory-exercise-muscle-group-repository'
import { SearchExerciseMuscleGroupUseCase } from './search-exercise-muscle-group'

let exerciseMuscleGroupRepository: InMemoryExerciseMuscleGroupRepository
let exerciseRepository: InMemoryExerciseRepository
let sut: SearchExerciseMuscleGroupUseCase

describe('Search exercise muscle group Use Case', () => {

  beforeEach(()=>{
    exerciseMuscleGroupRepository = new InMemoryExerciseMuscleGroupRepository()
    exerciseRepository = new InMemoryExerciseRepository()
    sut = new SearchExerciseMuscleGroupUseCase(exerciseMuscleGroupRepository)
  })

  it('should be able to create a exercise muscle group and search', async () => {
    const exercise: Exercise =({
      name: 'Supino',
      description: 'Supino com peso',
      difficulty: 'BEGINNER',
      requires_equipment: true,
      id_exercise: '123'
     })
     exerciseRepository.items.push(exercise)

     await exerciseMuscleGroupRepository.create({
      id_exercise: '123',
      id_group: '1234',
    })

    const { exerciseMuscleGroup } = await sut.execute({ query: '123' })
     
    expect(exerciseMuscleGroup).toHaveLength(1)
    expect(exerciseMuscleGroup[0].id_group).toEqual('1234')
  })
})
