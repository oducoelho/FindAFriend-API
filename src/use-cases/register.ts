import { prisma } from '@/lib/prisma'
import { PrismaOrgRepository } from '@/repositories/prisma-org-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cep: string
  endereco: string
  whatsapp: string
  password: string
}

export async function registerUseCase({
  cep,
  email,
  endereco,
  name,
  whatsapp,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.organization.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaOrgRepository = new PrismaOrgRepository()

  await prismaOrgRepository.create({
    cep,
    email,
    endereco,
    name,
    whatsapp,
    password_hash,
  })
}


