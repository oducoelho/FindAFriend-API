import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetByCityUseCase } from '../search-pet-by-city'

export function makeSearchPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetByCityUseCase = new SearchPetByCityUseCase(petsRepository)

  return fetchPetByCityUseCase
}
