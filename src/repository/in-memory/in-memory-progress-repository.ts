import { Prisma, Progress } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ProgressRepository } from '../progress-repository'


export class InMemoryProgressRepository implements ProgressRepository {

    public items: Progress[] = []

  async create(data: Prisma.ProgressUncheckedCreateInput) {
    const progress = {
      id_progress: data.id_progress ?? randomUUID(),
      id_exercise: data.id_exercise ?? randomUUID,
      id: data.id ?? randomUUID(),
      date: new Date(),
      completed_series: data.completed_series,
      completed_repetitions: data.completed_repetitions,
      used_weight: data.used_weight
    }

    this.items.push(progress)

    return progress
  }
  async searchMany(query: string) {
    return this.items
      .filter((item) => item.id.includes(query))
  }
}