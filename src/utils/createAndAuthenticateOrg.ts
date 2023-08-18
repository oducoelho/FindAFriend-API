import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'ORG1',
      email: 'ORG@example.COM',
      cep: '13705000',
      address: 'addressExample',
      phone_number: '12345678',
      password_hash: '123456',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'ORG@example.COM',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
