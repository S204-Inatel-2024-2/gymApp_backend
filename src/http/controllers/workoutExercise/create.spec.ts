import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'
import { Difficulty } from '@prisma/client'

describe('Create workout exercise (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close() 
  })

  it('should be able to create a relation with workout and exercise', async () => {
    const { token, use } = await createAndAuthenticateUser(app, true)
  
    const exerciseResponse = await request(app.server)
      .post('/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Supino',
        description: 'Supino reto',
        difficulty: Difficulty.BEGINNER,
        requires_equipment: true, 
      })

      const exerciseId = exerciseResponse.body.Exercise.id_exercise;

    const response = await request(app.server)
      .post(`/workout/${use.id}/workouts`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Segunda',
        objective: 'Ganho de massa muscular'
      })

      console.log(response.statusCode, response.body)
      const workoutId = response.body.Workout.id_workout;

    const workoutExerciseResponse = await request(app.server)
      .post(`/workoutExercise/${exerciseId}/${workoutId}`) 
      .set('Authorization', `Bearer ${token}`)
      .send({
        series:3 ,
        repetitions: 12 ,
        rest: 10
      })

    console.log(exerciseResponse.statusCode, exerciseResponse.body)
    console.log(response.statusCode, response.body)
    console.log(workoutExerciseResponse.body, workoutExerciseResponse.statusCode)
    console.log(exerciseResponse.body.Exercise.id_exercise)
    console.log(response.body.Workout.id_workout)

    if (workoutExerciseResponse.statusCode === 400) {
      console.log('Validation Issues:', JSON.stringify(workoutExerciseResponse.body.issues, null, 2));
    }
  
    expect(exerciseResponse.statusCode).toEqual(201)
    expect(workoutExerciseResponse.statusCode).toEqual(201)
  })
})
