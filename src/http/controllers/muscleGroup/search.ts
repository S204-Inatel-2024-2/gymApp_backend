import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchMuscleGroupUseCase } from '@/use-cases/factories/make-search-muscle-group-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchMuscleGroupQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchMuscleGroupQuerySchema.parse(request.query)

  const searchMuscleGroupUseCase = makeSearchMuscleGroupUseCase()

  const { muscleGroup } = await searchMuscleGroupUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    muscleGroup,
  })
}