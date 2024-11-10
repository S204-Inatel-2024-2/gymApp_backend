import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateExerciseUseCase } from '@/use-cases/factories/make-exercise-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createExerciseBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    difficulty: z.enum(['BEGINNER','INTERMEDIATE','ADVANCED']),
    requires_equipment: z.boolean()
  })

  const { name, description, requires_equipment, difficulty } =
    createExerciseBodySchema.parse(request.body)

  const createExerciseUseCase = makeCreateExerciseUseCase()

  // Executa o caso de uso
  const exercise = await createExerciseUseCase.execute({
    name,
    description,
    requires_equipment,
    difficulty
  })

  // Retorna o exercício criado com status 201
  return reply.status(201).send(exercise)
}
