import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'

describe('Search exercise muscle group  (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a exercise muscle group', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const responseExercise = await request(app.server)
      .get('/exerciseMuscleGroup/search')
      .query({
        q: 'a769b3ba-2c76-4bf9-baa6-022b508d7a91',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseExercise.statusCode).toEqual(200)


  })
})