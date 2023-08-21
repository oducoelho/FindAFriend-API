import { prisma } from '@/lib/prisma'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server)
    .post('/orgs')
    .send({
      name: 'ORG1',
      email: 'ORG1@example.COM',
      cep: '13705000',
      address: 'addressExample',
      phone_number: '12345678',
      password_hash: await hash('123456', 6),
    })

  const { id: organization_id } =
    (await prisma.organization.findFirst()) as Organization

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'ORG1@example.COM',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    organization_id,
  }
}
