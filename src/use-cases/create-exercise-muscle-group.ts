import { ExerciseMuscleGroupRepository } from '@/repository/exercise-muscle-group-repository'
import { ExercisesRepository } from '@/repository/exercises-repository'
import { ExerciseMuscleGroup } from '@prisma/client'

interface CreateExerciserMuscleGroupUseCaseRequest {
  id_exercise: string,
  id_group: string
}

interface CreateExerciseMuscleGroupUseCaseResponse {
  ExerciseMuscleGroup: ExerciseMuscleGroup
}

export class CreateExerciseMuscleGloupUseCase {
  constructor(
    private ExerciseMuscleGroup: ExerciseMuscleGroupRepository,
    private exerciseRepository: ExercisesRepository
) {}

  async execute({
    id_exercise,
    id_group
  }: CreateExerciserMuscleGroupUseCaseRequest): Promise<CreateExerciseMuscleGroupUseCaseResponse> {
    const exercise = await this.exerciseRepository.findById(id_exercise);

    if(!exercise) {
        throw new Error()
    }

    const ExerciseMuscleGroup = await this.ExerciseMuscleGroup.create({
      id_exercise,
      id_group
    })

    return {
        ExerciseMuscleGroup,
    }
  }
}