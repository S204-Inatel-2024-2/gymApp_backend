import { ProgressRepository } from '@/repository/progress-repository'
import { Progress, WorkoutExercise } from '@prisma/client'

interface SearchProgressUseCaseRequest {
  query: string
}

interface SearchProgressUseCaseResponse {
  progress: Progress[]
}

export class SearchProgressUseCase {
  constructor(private progressRepository: ProgressRepository) {}

  async execute({
    query,
  }: SearchProgressUseCaseRequest): Promise<SearchProgressUseCaseResponse> {
    const progress = await this.progressRepository.searchMany(query)

    return {
        progress,
    }
  }
}