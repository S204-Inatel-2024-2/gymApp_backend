import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use-case'
import { Difficulty } from '@prisma/client'

describe('Search exercises (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search exercises', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    // Cria um exercício para testar a busca
    await request(app.server)
      .post('/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Supino',
        description: 'Supino reto',
        difficulty: Difficulty.BEGINNER,
        requires_equipment: true,
      })

    // Realiza a busca pelo exercício criado
    const responseExercise = await request(app.server)
      .get('/exercise/search')
      .query({
        q: 'Supino',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Verifica se o status da resposta é 200
    expect(responseExercise.statusCode).toEqual(200)

    // Verifica se a resposta contém a lista de exercícios com o exercício criado
    expect(responseExercise.body).toHaveProperty('exercises')

  })
})
