import { randomUUID } from 'node:crypto'
import { ExerciseMuscleGroup, Prisma, WorkoutExercise } from '@prisma/client'
import { ExerciseMuscleGroupRepository } from '../exercise-muscle-group-repository'


export class InMemoryExerciseMuscleGroupRepository implements ExerciseMuscleGroupRepository {

    public items: ExerciseMuscleGroup[] = []

  async create(data: Prisma.ExerciseMuscleGroupUncheckedCreateInput) {
    const exerciseMuscleGroup = {
      id_group: data.id_group ?? randomUUID(),
      id_exercise: data.id_exercise ?? randomUUID(),
    }

    this.items.push(exerciseMuscleGroup)

    return exerciseMuscleGroup
  }

  async searchMany(query: string) {
    return this.items
      .filter((item) => item.id_exercise.includes(query))
  }
}