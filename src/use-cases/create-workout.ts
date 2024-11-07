import { UsersRepository } from '@/repository/users-repository'
import { WorkoutsRepository } from '@/repository/workouts-repository'
import { Workout } from '@prisma/client'

interface CreateWorkoutUseCaseRequest {
  name: string
  id: string
  objective: string
}

interface CreateWorkoutUseCaseResponse {
  Workout: Workout
}

export class CreateWorkoutUseCase {
  constructor(
    private WorkoutsRepository: WorkoutsRepository,
    private usersRepository: UsersRepository
) {}

  async execute({
    name,
    id,
    objective
  }: CreateWorkoutUseCaseRequest): Promise<CreateWorkoutUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if(!user) {
        throw new Error()
        }

    const Workout = await this.WorkoutsRepository.create({
      name,
      id,
      objective
    })

    return {
        Workout,
    }
  }
}