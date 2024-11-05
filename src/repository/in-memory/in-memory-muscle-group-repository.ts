import { MuscleGroup, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MuscleGroupRepository } from '../muscle-group-repository'


export class InMemoryMuscleGroupRepository implements MuscleGroupRepository {

    public items: MuscleGroup[] = []

  async create(data: Prisma.MuscleGroupCreateInput) {
    const muscleGroup = {
      id_group: data.id_group ?? randomUUID(),
      name: data.name,
    }

    this.items.push(muscleGroup)

    return muscleGroup
  }
}