import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Search muscle group  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a muscle group', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const responseExercise = await request(app.server)
      .get('/muscleGroup/search')
      .query({
        q: 'Superiores',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseExercise.statusCode).toEqual(200)


  })
})