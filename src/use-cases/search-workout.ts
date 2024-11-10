import { WorkoutsRepository } from '@/repository/workouts-repository'
import { Workout } from '@prisma/client'

interface SearchWorkoutUseCaseRequest {
  query: string
}

interface SearchWorkoutUseCaseResponse {
  workouts: Workout[]
}

export class SearchWorkoutsUseCase {
  constructor(private workoutRepository: WorkoutsRepository) {}

  async execute({
    query,
  }: SearchWorkoutUseCaseRequest): Promise<SearchWorkoutUseCaseResponse> {
    const workouts = await this.workoutRepository.searchMany(query)

    return {
     workouts,
    }
  }
}