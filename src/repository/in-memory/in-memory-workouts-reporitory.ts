import { Prisma, Workout } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { WorkoutsRepository } from '../workouts-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {

  public items: Workout[] = []

  async create(data: Prisma.WorkoutUncheckedCreateInput) {
    const workout: Workout = {
      id_workout: data.id_workout ?? randomUUID(),
      id: data.id,
      name: data.name,
      objective: data.objective,
      created_at: new Date(),      
    }

    this.items.push(workout)

    return workout
  }

  async searchMany(query: string) {
    return this.items
      .filter((item) => item.name.includes(query))
  }
}
