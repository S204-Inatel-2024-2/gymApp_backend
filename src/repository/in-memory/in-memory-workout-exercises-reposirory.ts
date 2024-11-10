import { randomUUID } from 'node:crypto'
import { WorkoutExerciseRepository } from '../workout-exercises-repository'
import { Prisma, WorkoutExercise } from '@prisma/client'


export class InMemoryWorkoutExercisesRepository implements WorkoutExerciseRepository {

    public items: WorkoutExercise[] = []

  async create(data: Prisma.WorkoutExerciseUncheckedCreateInput) {
    const workoutExercise = {
      id_workout: data.id_workout ?? randomUUID(),
      id_exercise: data.id_exercise ?? randomUUID(),
      series : data.series,
      repetitions : data.repetitions,
      rest : data.rest
    }

    this.items.push(workoutExercise)

    return workoutExercise
  }

  async searchMany(query: string) {
    return this.items
      .filter((item) => item.id_workout.includes(query))
  }
}