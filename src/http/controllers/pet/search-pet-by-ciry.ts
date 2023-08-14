import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSearchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'

export async function setchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const setchPetByCityBodySchema = z.object({
    query: z.string(),
    page: z.number(),
  })

  const { query, page } = setchPetByCityBodySchema.parse(request.body)

  try {
    const setchPetByCityUseCase = makeSearchPetByCityUseCase()

    await setchPetByCityUseCase.execute({
      query,
      page,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
