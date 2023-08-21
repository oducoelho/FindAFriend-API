import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from './createAndAuthenticateOrg'

export async function createAndTakePet(app: FastifyInstance) {
  const { organization_id } = await createAndAuthenticateOrg(app)

  const pet = await prisma.pet.create({
    data: {
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      city: 'San Francisco',
      characteristics: 'Preto e branco',
      energy: '4',
      organization_id,
      port: 'medium',
    },
  })

  return {
    pet,
  }
}
