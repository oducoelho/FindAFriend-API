import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().min(8),
    endereco: z.string(),
    whatsapp: z.string().min(8),
    password: z.string().min(6),
  })

  const { cep, email, endereco, name, password, whatsapp } =
    registerBodySchema.parse(request.body)

  await prisma.organization.create({
    data: {
      name,
      email,
      cep,
      endereco,
      whatsapp,
      password_hash: password,
    },
  })

  return reply.status(201).send()
}
