import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'
import { Difficulty } from '@prisma/client'

describe('Create progress (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close() 
  })

  it('should be able to create a progress associated with a user and exercise', async () => {
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

    const progressResponse = await request(app.server)
      .post(`/progress/${use.id}/${exerciseId}`) 
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2020-10-09',
        completed_series: 3,
        completed_repetitions: 10,
        used_weight: 50
      })

    // console.log(progressResponse.statusCode)
    // console.log(exerciseResponse.statusCode)
    // console.log(exerciseResponse.body)
    // console.log(progressResponse.body)
    // console.log(exerciseResponse.body.Exercise.id_exercise)
    // console.log(use.id)

    if (progressResponse.statusCode === 400) {
      console.log('Validation Issues:', JSON.stringify(progressResponse.body.issues, null, 2));
    }
  
    expect(exerciseResponse.statusCode).toEqual(201)
    expect(progressResponse.statusCode).toEqual(201)
  })
})
