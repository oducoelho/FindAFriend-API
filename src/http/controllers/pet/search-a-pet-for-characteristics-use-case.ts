import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSearchAPetForCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-a-pet-for-adoption-use-case'

export async function SearchAPetForCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const SearchAPetForCharacteristicsBodySchema = z.object({
    characteristics: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { characteristics, page } =
    SearchAPetForCharacteristicsBodySchema.parse(request.body)

  try {
    const SearchAPetForCharacteristicsUseCase =
      makeSearchAPetForCharacteristicsUseCase()

    await SearchAPetForCharacteristicsUseCase.execute({
      characteristics,
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
