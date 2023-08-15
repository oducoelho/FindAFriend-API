import { makeGetOngProfileUseCase } from '@/use-cases/factories/make-get-ong-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetOngProfileUseCase()

  const { org } = await getUserProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({ ...org, password_hash: undefined })
}
