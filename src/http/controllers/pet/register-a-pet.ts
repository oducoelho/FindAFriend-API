import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exixts'
import { makeRegisterAPetUseCase } from '@/use-cases/factories/make-register-a-pet-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerAPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const RegisterAPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    city: z.string(),
    port: z.string(),
    energy: z.string(),
    organizationId: z.string(),
  })

  const { name, age, city, description, energy, port, organizationId } =
    RegisterAPetBodySchema.parse(request.body)

  try {
    const registerAPetUseCase = makeRegisterAPetUseCase()

    await registerAPetUseCase.execute({
      name,
      age,
      city,
      description,
      energy,
      port,
      organizationId,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
