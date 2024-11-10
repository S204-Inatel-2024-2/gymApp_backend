import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  // Gera um sufixo único para o email com base no timestamp
  const uniqueSuffix = Date.now()
  const email = `johndoe${uniqueSuffix}@example.com`

  const use = await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 6),
      height: '1.73',
      weight: '60',
      date_of_birth: new Date(2002, 9, 10),
      objective: 'hipertrofia',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    use,
    email
  }
}
