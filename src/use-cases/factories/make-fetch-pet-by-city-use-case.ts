import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetByCityUseCase } from '../search-pet-by-city'

export function makeFetchPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetByCityUseCase = new FetchPetByCityUseCase(petsRepository)

  return fetchPetByCityUseCase
}