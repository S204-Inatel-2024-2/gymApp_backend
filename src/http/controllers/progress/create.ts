import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateProgressUseCase } from '@/use-cases/factories/make-create-progress-use-case'

export async function create(request: FastifyRequest<{ Params: { id_exercise: string } }>, reply: FastifyReply) {
  const createProgressBodySchema = z.object({
    date: z.string().refine(value => !isNaN(Date.parse(value)), { message: 'Invalid date format' })
      .transform((value) => new Date(value)),
    completed_series: z.number(),
    completed_repetitions: z.number(),
    used_weight: z.number(),
  });

  const { 
    date, 
    completed_series, 
    completed_repetitions, 
    used_weight 
  } = createProgressBodySchema.parse(request.body);

  const { id_exercise } = request.params;  // Agora, o TypeScript sabe que `id_exercise` é uma string

  const createProgressUseCase = makeCreateProgressUseCase();

  const progress = await createProgressUseCase.execute({
    date,
    completed_repetitions,
    completed_series,
    used_weight,
    id: request.user.sub,
    id_exercise,
  });

  return reply.status(201).send(progress);
}
