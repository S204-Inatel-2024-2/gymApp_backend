import { ExercisesRepository } from '@/repository/exercises-repository'
import { Difficulty, Exercise } from '@prisma/client'

interface CreateExerciseUseCaseRequest {
  name: string
  description: string
  difficulty: Difficulty
  requires_equipment: boolean
}

interface CreateExerciseUseCaseResponse {
  Exercise: Exercise
}

export class CreateExerciseUseCase {
  constructor(private ExercisesRepository: ExercisesRepository) {}

  async execute({
    name,
    description,
    difficulty,
    requires_equipment
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const Exercise = await this.ExercisesRepository.create({
      name,
      description,
      difficulty,
      requires_equipment,
    })

    return {
        Exercise,
    }
  }
}