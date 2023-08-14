import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeFetchAPetForAdoptionUseCase } from '@/use-cases/factories/make-fetch-a-pet-for-adoption-use-case'

export async function fetchAPetForAdoption(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAPetForAdoptionBodySchema = z.object({
    name: z.string(),
    page: z.number(),
  })

  const { name, page } = fetchAPetForAdoptionBodySchema.parse(request.body)

  try {
    const fetchAPetForAdoptionUseCase = makeFetchAPetForAdoptionUseCase()

    await fetchAPetForAdoptionUseCase.execute({
      name,
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
