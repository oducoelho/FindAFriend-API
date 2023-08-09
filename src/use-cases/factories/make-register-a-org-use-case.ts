import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { RegisterAOrgUseCase } from '../register-a-org'

export function makeRegisterAOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterAOrgUseCase(orgsRepository)

  return registerUseCase
}
