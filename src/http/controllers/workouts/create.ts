import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateExerciseUseCase } from '@/use-cases/factories/make-exercise-use-case'
import { makeCreateWorkoutUseCase } from '@/use-cases/factories/make-create-workout-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createWorkoutBodySchema = z.object({
    name: z.string(),
    objective: z.string(),
  })

  const { name, objective } =
  createWorkoutBodySchema.parse(request.body)

  const createWorkoutUseCase = makeCreateWorkoutUseCase()

  await createWorkoutUseCase.execute({
    name,
    objective,
    id: request.user.sub
  })

  return reply.status(201).send()
}