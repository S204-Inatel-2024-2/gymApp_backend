import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function workoutExerciseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/workoutExercise/:id_exercise/:id_workout', create)
  app.get('/workoutExercise/search', search)
}