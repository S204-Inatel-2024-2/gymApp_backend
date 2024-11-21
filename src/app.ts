import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { muscleGroupRoutes } from './http/controllers/muscleGroup/routes'
import { workoutsRoutes } from './http/controllers/workouts/routes'
import { exercisesRoutes } from './http/controllers/exercises/routes'
import { exerciseMuscleGroupRoutes } from './http/controllers/exerciseMuscleGroup/routes'
import { workoutExerciseRoutes } from './http/controllers/workoutExercise/routes'
import { progressRoutes } from './http/controllers/progress/routes'

export const app = fastify()

// Configuração do JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Configuração de Cookies
app.register(fastifyCookie)

// Configuração de CORS
app.register(fastifyCors, {
  origin: '*', // Permite todas as origens (substitua com domínio específico, se necessário)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite cookies e cabeçalhos de autenticação
})

// Registro das rotas
app.register(usersRoutes)
app.register(muscleGroupRoutes)
app.register(workoutsRoutes)
app.register(exercisesRoutes)
app.register(progressRoutes)
app.register(exerciseMuscleGroupRoutes)
app.register(workoutExerciseRoutes)

// Manipulador de erros
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui devemos logar em ferramentas externas como DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export default app
