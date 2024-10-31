import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false){
  const use = await prisma.user.create({
    data:{
      name: 'John Doe',
      email: 'johndoe3@example.com',
      password_hash: await hash('123456', 6),
      height: '1.73',
      weight: '60',
      date_of_birth: new Date(2002, 9, 10),
      objective: 'hipertrofia',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe3@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}