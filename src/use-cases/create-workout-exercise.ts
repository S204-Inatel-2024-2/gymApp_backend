import { ExercisesRepository } from '@/repository/exercises-repository'
import { WorkoutExerciseRepository } from '@/repository/workout-exercises-repository'
import { WorkoutExercise } from '@prisma/client'

interface CreateWorkoutExerciseUseCaseRequest {
  series: number,
  repetitions: number,
  rest: number,
  id_exercise: string,
  id_workout: string
}

interface CreateWorkoutExerciseUseCaseResponse {
  WorkoutExercise: WorkoutExercise
}

export class CreateWorkoutExerciseUseCase {
  constructor(
    private WorkoutExercises: WorkoutExerciseRepository,
    private exerciseRepository: ExercisesRepository
) {}

  async execute({
    series,
    repetitions,
    rest,
    id_exercise,
    id_workout
  }: CreateWorkoutExerciseUseCaseRequest): Promise<CreateWorkoutExerciseUseCaseResponse> {
    const exercise = await this.exerciseRepository.findById(id_exercise);

    if(!exercise) {
        throw new Error()
    }

    const WorkoutExercise = await this.WorkoutExercises.create({
      series,
      repetitions,
      rest,
      id_exercise,
      id_workout
    })

    return {
        WorkoutExercise,
    }
  }
}