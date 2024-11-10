import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchExerciseMuscleGroupUseCase } from '@/use-cases/factories/make-search-exercise-muscle-group'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchExerciseMuscleGroupQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchExerciseMuscleGroupQuerySchema.parse(request.query)

  const searchExerciseMuscleGroupUseCase = makeSearchExerciseMuscleGroupUseCase()

  const { exerciseMuscleGroup } = await searchExerciseMuscleGroupUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    exerciseMuscleGroup,
  })
}