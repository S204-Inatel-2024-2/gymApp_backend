import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Create Muscle Group (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a muscle group', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/muscleGroup')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Superiores',
      })

      console.log(response.statusCode, response.body);


    expect(response.statusCode).toEqual(201)
  })
})