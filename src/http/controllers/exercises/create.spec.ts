import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'
import { Difficulty } from '@prisma/client'

describe('Create exercise (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a exercise', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Supino',
        description: 'Supino reto',
        difficulty: Difficulty.BEGINNER,
        requires_equipment: true, 
      })

    expect(response.statusCode).toEqual(201)
  })
})