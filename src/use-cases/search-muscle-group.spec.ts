import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryWorkoutsRepository } from '@/repository/in-memory/in-memory-workouts-reporitory'
import { SearchWorkoutsUseCase } from './search-workout'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { Exercise, User, Workout, WorkoutExercise } from '@prisma/client'
import { SearchWorkoutExerciseUseCase } from './search-workout-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'
import { InMemoryWorkoutExercisesRepository } from '@/repository/in-memory/in-memory-workout-exercises-reposirory'
import { SearchMuscleGroupUseCase } from './search-muscle-group'
import { InMemoryMuscleGroupRepository } from '@/repository/in-memory/in-memory-muscle-group-repository'

let muscleGroupRepository: InMemoryMuscleGroupRepository
let sut: SearchMuscleGroupUseCase

describe('Search Muscle group Use Case', () => {

  beforeEach(()=>{
    muscleGroupRepository = new InMemoryMuscleGroupRepository()
    sut = new SearchMuscleGroupUseCase(muscleGroupRepository)
  })

  it('should be able to create a muscle group', async () => {
     await muscleGroupRepository.create({
        name: 'Superiores',
      })


    const { muscleGroup } = await sut.execute({ query: 'Superiores' })

    expect(muscleGroup).toHaveLength(1)
    expect(muscleGroup[0].name).toEqual('Superiores')
  })
})
