import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchWorkoutUseCase } from '@/use-cases/factories/make-search-workout-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchWorkoutQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchWorkoutQuerySchema.parse(request.query)

  const searchWorkoutUseCase = makeSearchWorkoutUseCase()

  const { workouts } = await searchWorkoutUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    workouts,
  })
}