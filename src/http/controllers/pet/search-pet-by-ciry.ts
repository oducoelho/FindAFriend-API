import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pet-by-city-use-case'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetByCityBodySchema = z.object({
    city: z.coerce.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = searchPetByCityBodySchema.parse(request.body)

  const searchPetByCityUseCase = makeSearchPetByCityUseCase()

  const { pet } = await searchPetByCityUseCase.execute({
    city,
    page,
  })

  return reply.status(200).send({
    pet,
  })
}
