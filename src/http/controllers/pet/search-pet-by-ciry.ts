import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSearchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetByCityBodySchema = z.object({
    query: z.string(),
    page: z.number(),
  })

  const { query, page } = searchPetByCityBodySchema.parse(request.body)

  try {
    const searchPetByCityUseCase = makeSearchPetByCityUseCase()

    await searchPetByCityUseCase.execute({
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
