import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function muscleGroupRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/muscleGroup', create)
}