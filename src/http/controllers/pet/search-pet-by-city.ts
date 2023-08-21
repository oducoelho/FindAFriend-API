import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetByCityBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = searchPetByCityBodySchema.parse(request.query)

  const searchPetByCityUseCase = makeSearchPetByCityUseCase()

  try {
    const { pet } = await searchPetByCityUseCase.execute({
      city,
      page,
    })
    return reply.send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
