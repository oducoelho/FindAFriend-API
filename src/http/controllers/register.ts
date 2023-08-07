import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exixts'
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
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
