import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exixts'
import { makeRegisterAOrgUseCase } from '@/use-cases/factories/make-register-a-org-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerAOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const RegisterAOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string().min(8),
    address: z.string(),
    phone_number: z.string().min(8),
    password: z.string().min(6),
  })

  const { cep, email, address, name, password, phone_number } =
    RegisterAOrgBodySchema.parse(request.body)

  try {
    const registerAOrgUseCase = makeRegisterAOrgUseCase()

    await registerAOrgUseCase.execute({
      cep,
      email,
      address,
      name,
      password,
      phone_number,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
