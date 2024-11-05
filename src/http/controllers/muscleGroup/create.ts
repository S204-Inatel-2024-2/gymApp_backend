import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateMuscleGroupUseCase } from '@/use-cases/factories/make-create-muscle-group-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
  })

  const { name } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateMuscleGroupUseCase()

  await createGymUseCase.execute({
    name
  })

  return reply.status(201).send()
}