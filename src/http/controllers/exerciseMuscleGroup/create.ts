import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateExerciseMuscleGroup } from '@/use-cases/factories/make-create-exercise-muscle-group';

export async function create(request: FastifyRequest<{ Params: { id_exercise: string, id_group: string } }>, reply: FastifyReply) {


  const { id_exercise, id_group } = request.params; 
  const createExerciseMuscleGroupUseCase = makeCreateExerciseMuscleGroup()

  await createExerciseMuscleGroupUseCase.execute({
    id_exercise,
    id_group
  })

  return reply.status(201).send()
}