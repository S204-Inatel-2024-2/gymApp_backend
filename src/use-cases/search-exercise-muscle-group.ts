import { ExerciseMuscleGroupRepository } from '@/repository/exercise-muscle-group-repository'
import { ExerciseMuscleGroup } from '@prisma/client'

interface SearchExercisesMuscleGroupUseCaseRequest {
  query: string
}

interface SearchExercisesMuscleGroupUseCaseResponse {
  exerciseMuscleGroup: ExerciseMuscleGroup[]
}

export class SearchExerciseMuscleGroupUseCase {
  constructor(private exerciseMuscleGroupRepository: ExerciseMuscleGroupRepository) {}

  async execute({
    query,
  }: SearchExercisesMuscleGroupUseCaseRequest): Promise<SearchExercisesMuscleGroupUseCaseResponse> {
    const exerciseMuscleGroup = await this.exerciseMuscleGroupRepository.searchMany(query)

    return {
        exerciseMuscleGroup,
    }
  }
}