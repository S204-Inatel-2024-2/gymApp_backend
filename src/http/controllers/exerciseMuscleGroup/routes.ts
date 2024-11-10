import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function exerciseMuscleGroupRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/exerciseMuscleGroup/:id_exercise/:id_group', create)
  app.get('/exerciseMuscleGroup/search', search)
}