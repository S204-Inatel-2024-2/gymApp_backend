import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Search workout exercise  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a workout exercise', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const responseExercise = await request(app.server)
      .get('/workoutExercise/search')
      .query({
        q: '25150b0e-c3c6-4bce-9acd-16f503d70a3e',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseExercise.statusCode).toEqual(200)


  })
})