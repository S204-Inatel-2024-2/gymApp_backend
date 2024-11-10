import { WorkoutExerciseRepository } from '@/repository/workout-exercises-repository'
import { WorkoutExercise } from '@prisma/client'

interface SearchWorkoutExerciseUseCaseRequest {
  query: string
}

interface SearchWorkoutExerciseUseCaseResponse {
  workoutExercise: WorkoutExercise[]
}

export class SearchWorkoutExerciseUseCase {
  constructor(private workoutExerciseRepository: WorkoutExerciseRepository) {}

  async execute({
    query,
  }: SearchWorkoutExerciseUseCaseRequest): Promise<SearchWorkoutExerciseUseCaseResponse> {
    const workoutExercise = await this.workoutExerciseRepository.searchMany(query)

    return {
        workoutExercise,
    }
  }
}