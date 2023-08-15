import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { GetOrgProfileUseCase } from '../get-org-profile'

export function makeGetOngProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const orgUseCase = new GetOrgProfileUseCase(orgsRepository)

  return orgUseCase
}
