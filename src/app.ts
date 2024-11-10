import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { muscleGroupRoutes } from './http/controllers/muscleGroup/routes'
import { workoutsRoutes } from './http/controllers/workouts/routes'
import { exercisesRoutes } from './http/controllers/exercises/routes'
import { exerciseMuscleGroupRoutes } from './http/controllers/exerciseMuscleGroup/routes'
import { workoutExerciseRoutes } from './http/controllers/workoutExercise/routes'
import { progressRoutes } from './http/controllers/progress/routes'

export const app = fastify()

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
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(muscleGroupRoutes)
app.register(workoutsRoutes)
app.register(exercisesRoutes)
app.register(progressRoutes)
app.register(exerciseMuscleGroupRoutes)
app.register(workoutExerciseRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export default app;
