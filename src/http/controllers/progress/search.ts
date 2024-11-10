import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchProgressUseCase } from '@/use-cases/factories/make-search-progress-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchProgressQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchProgressQuerySchema.parse(request.query)

  const searchProgressUseCase = makeSearchProgressUseCase()

  const { progress } = await searchProgressUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    progress,
  })
}