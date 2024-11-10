import { Difficulty, Exercise, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ExercisesRepository } from '../exercises-repository'

export class InMemoryExerciseRepository implements ExercisesRepository {

  public items: Exercise[] = []

  async create(data: Prisma.ExerciseCreateInput) {
    const exercise: Exercise = {
      id_exercise: data.id_exercise ?? randomUUID(),
      name: data.name,
      description: data.description,
      difficulty: data.difficulty ?? Difficulty.BEGINNER,
      requires_equipment: data.requires_equipment ?? false,
    }

    this.items.push(exercise)

    return exercise
  }

  async findById(id_exercise: string) {
    const exercise = this.items.find((item) => item.id_exercise === id_exercise)

    if (!exercise) {
      return null
    }

    return exercise
  }

  async searchMany(query: string) {
    return this.items
      .filter((item) => item.name.includes(query))
  }

}
