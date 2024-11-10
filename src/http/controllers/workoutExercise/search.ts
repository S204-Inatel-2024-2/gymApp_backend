import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchWorkoutExerciseUseCase } from '@/use-cases/factories/make-search-workout-exercise-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchWorkoutExerciseQuerySchema = z.object({
    q: z.string(),
  })

  const { q } = searchWorkoutExerciseQuerySchema.parse(request.query)

  const searchWorkoutExerciseUseCase = makeSearchWorkoutExerciseUseCase()

  const { workoutExercise } = await searchWorkoutExerciseUseCase.execute({
    query: q
  })

  return reply.status(200).send({
    workoutExercise,
  })
}