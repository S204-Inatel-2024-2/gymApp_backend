import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Create Workout (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a workout associated with a user', async () => {
    const { token, use} = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post(`/workout/${use.id}/workouts`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Segunda',
        objective: 'Ganho de massa muscular'
      })

    expect(response.statusCode).toEqual(201)
  })
})
