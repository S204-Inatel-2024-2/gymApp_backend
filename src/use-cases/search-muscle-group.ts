import { MuscleGroupRepository } from '@/repository/muscle-group-repository'
import { MuscleGroup } from '@prisma/client'

interface SearchMuscleGroupUseCaseRequest {
  query: string
}

interface SearchMuscleGroupUseCaseResponse {
  muscleGroup: MuscleGroup[]
}

export class SearchMuscleGroupUseCase {
  constructor(private muscleGroupRepository: MuscleGroupRepository) {}

  async execute({
    query,
  }: SearchMuscleGroupUseCaseRequest): Promise<SearchMuscleGroupUseCaseResponse> {
    const muscleGroup = await this.muscleGroupRepository.searchMany(query)

    return {
        muscleGroup,
    }
  }
}