import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchExerciseUseCase } from '@/use-cases/factories/make-search-exercise-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchExercisesQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchExercisesQuerySchema.parse(request.query)

  const searchExerciseUseCase = makeSearchExerciseUseCase()

  const { exercises } = await searchExerciseUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    exercises,
  })
}