import { MuscleGroupRepository } from '@/repository/muscle-group-repository'
import { MuscleGroup } from '@prisma/client'

interface CreateMuscleGroupUseCaseRequest {
  name: string
}

interface CreateMuscleGroupUseCaseResponse {
  muscleGroup: MuscleGroup
}

export class CreateMuscleGroupUseCase {
  constructor(private muscleGroupsRepository: MuscleGroupRepository) {}

  async execute({
    name
  }: CreateMuscleGroupUseCaseRequest): Promise<CreateMuscleGroupUseCaseResponse> {
    const muscleGroup = await this.muscleGroupsRepository.create({
      name
    })

    return {
        muscleGroup,
    }
  }
}