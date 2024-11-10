import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Search workout  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a workout', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const responseExercise = await request(app.server)
      .get('/workout/search')
      .query({
        q: 'Segunda',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseExercise.statusCode).toEqual(200)


  })
})