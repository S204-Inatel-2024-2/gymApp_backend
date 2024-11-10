import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateWorkoutExercise } from '@/use-cases/factories/make-workout-exercise-use-case';

export async function create(request: FastifyRequest<{ Params: { id_exercise: string, id_workout: string } }>, reply: FastifyReply) {
  const createWorkoutExerciseBodySchema = z.object({
    series: z.number(),
    repetitions: z.number(),
    rest: z.number(),
  });

  const { 
    series,
    repetitions,
    rest
  } = createWorkoutExerciseBodySchema.parse(request.body);

  const { id_exercise, id_workout } = request.params;

  const createWorkoutExerciseUseCase = makeCreateWorkoutExercise();

  const progress = await createWorkoutExerciseUseCase.execute({
    series,
    repetitions,
    rest,
    id_exercise,
    id_workout,
  });

  return reply.status(201).send(progress);
}
