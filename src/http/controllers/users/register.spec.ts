import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe90@example.com.br',
      password: '123456',
      height: '1.73',
      weight: '60',
      date_of_birth: '2020-10-09',
      objective: 'hipertrofia'
    })

    expect(response.statusCode).toEqual(201)
  })
})