import { ExercisesRepository } from '@/repository/exercises-repository'
import { Exercise } from '@prisma/client'

interface SearchExerciseUseCaseRequest {
  query: string
}

interface SearchExerciseUseCaseResponse {
  exercises: Exercise[]
}

export class SearchExercisesUseCase {
  constructor(private exerciseRepository: ExercisesRepository) {}

  async execute({
    query,
  }: SearchExerciseUseCaseRequest): Promise<SearchExerciseUseCaseResponse> {
    const exercises = await this.exerciseRepository.searchMany(query)

    return {
     exercises,
    }
  }
}