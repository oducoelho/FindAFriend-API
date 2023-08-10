import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterAPetUseCase } from '../register-a-pet-'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'

export function makeRegisterAPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const registerAPetUseCase = new RegisterAPetUseCase(
    petsRepository,
    orgsRepository,
  )

  return registerAPetUseCase
}
