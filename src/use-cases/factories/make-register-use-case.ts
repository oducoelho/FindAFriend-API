import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUseCase(orgsRepository)

  return registerUseCase
}
