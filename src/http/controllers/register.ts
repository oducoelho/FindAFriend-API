import { PrismaOrgRepository } from '@/repositories/prisma-org-repository'
import { RegisterUseCase } from '@/use-cases/register'
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

  try {
    const prismaOrgRepository = new PrismaOrgRepository()
    const registerUseCase = new RegisterUseCase(prismaOrgRepository)

    await registerUseCase.execute({
      cep,
      email,
      endereco,
      name,
      password,
      whatsapp,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
