import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchAPetForAdoptionUseCase } from '../fetch-a-pet-for-adoption'

export function makeFetchAPetForAdoptionUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchAPetForAdoptionUseCase = new FetchAPetForAdoptionUseCase(
    petsRepository,
  )

  return fetchAPetForAdoptionUseCase
}
