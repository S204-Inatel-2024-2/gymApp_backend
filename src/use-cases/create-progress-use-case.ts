import { ExercisesRepository } from '@/repository/exercises-repository';
import { ProgressRepository } from '@/repository/progress-repository';
import { UsersRepository } from '@/repository/users-repository';
import { Progress } from '@prisma/client';

interface CreateProgressUseCaseRequest {
  id: string;
  id_exercise: string;
  date: Date;
  completed_series: number;
  completed_repetitions: number;
  used_weight: number;
}

interface CreateProgressUseCaseResponse {
  progress: Progress;
}

export class CreateProgressUseCase {
  constructor(
    private progressRepository: ProgressRepository,
    private usersRepository: UsersRepository,
    private exerciseRepository: ExercisesRepository,
  ) {}

  async execute({
    id_exercise,
    id,
    date,
    completed_series,
    completed_repetitions,
    used_weight,
  }: CreateProgressUseCaseRequest): Promise<CreateProgressUseCaseResponse> {
    
    const exercise = await this.exerciseRepository.findById(id_exercise);

    if (!exercise) {
      throw new Error(`Exercise with ID ${id_exercise} not found`);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const progress = await this.progressRepository.create({
      id_exercise,
      id,
      date,
      completed_series,
      completed_repetitions,
      used_weight,
    });

    return {
      progress,
    };
  }
}
