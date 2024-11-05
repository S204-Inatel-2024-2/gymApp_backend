import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMuscleGroupRepository } from '@/repository/in-memory/in-memory-muscle-group-repository'
import { CreateMuscleGroupUseCase } from './create-muscle-group'



let muscleGroupRepository: InMemoryMuscleGroupRepository
let sut: CreateMuscleGroupUseCase

describe('Create Muscle group Use Case', () => {

  beforeEach(()=>{
    muscleGroupRepository = new InMemoryMuscleGroupRepository()
    sut = new CreateMuscleGroupUseCase(muscleGroupRepository)
  })

  it('should be able to create a muscle group', async () => {
  
     const { muscleGroup } = await sut.execute({
      name: 'Superiores',
     })

     expect(muscleGroup.id_group).toEqual(expect.any(String))
     expect(muscleGroup.name).toEqual('Superiores')
  })
  })