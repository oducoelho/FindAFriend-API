import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeFetchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'

export async function fetchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetByCityBodySchema = z.object({
    city: z.string(),
    page: z.number(),
  })

  const { city, page } = fetchPetByCityBodySchema.parse(request.body)

  try {
    const fetchPetByCityUseCase = makeFetchPetByCityUseCase()

    await fetchPetByCityUseCase.execute({
      page,
      city,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
