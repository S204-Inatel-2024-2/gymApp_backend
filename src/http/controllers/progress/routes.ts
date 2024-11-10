import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function progressRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/progress/:id/:id_exercise', create)
  app.get('/progress/search', search)
}