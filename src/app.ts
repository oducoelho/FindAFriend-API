import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()

const prisma = new PrismaClient()

prisma.organization.create({
  data: {
    cep: '13705000',
    email: 'jon.doe@example.com',
    endereco: 'example',
    name: 'jon doe',
    password_hash: '123',
    whatsapp: '199999999999',
  },
})
