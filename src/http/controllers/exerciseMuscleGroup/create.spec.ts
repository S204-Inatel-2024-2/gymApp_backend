import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'
import { Difficulty } from '@prisma/client'

describe('Create exercise Muscle Group (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close() 
  })

  it('should be able to create a relation with exercise and muscle group', async () => {
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
      .post('/muscleGroup')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Superiores',
      })

      console.log(response.statusCode, response.body);
      const muscleGroupId = response.body.muscleGroup.id_group;

    const exerciseMuscleGroupResponse = await request(app.server)
      .post(`/exerciseMuscleGroup/${exerciseId}/${muscleGroupId}`) 
      .set('Authorization', `Bearer ${token}`)

    console.log(response.statusCode)
    console.log(exerciseResponse.statusCode)
    console.log(exerciseResponse.body)
    console.log(response.body)
    console.log(exerciseMuscleGroupResponse.statusCode)
    console.log(exerciseMuscleGroupResponse.body)
  
    expect(exerciseResponse.statusCode).toEqual(201)
    expect(exerciseMuscleGroupResponse.statusCode).toEqual(201)
    expect(response.statusCode).toEqual(201)
  })
})
