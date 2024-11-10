import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Search progress  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a progress', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const responseExercise = await request(app.server)
      .get('/progress/search')
      .query({
        q: 'e035602d-9f1c-447b-b270-53349c4d6ac6',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseExercise.statusCode).toEqual(200)


  })
})