import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchAPetForCharacteristicsUseCase } from '../search-a-pet-for-characteristics-use-case'

export function makeSearchAPetForCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchAPetForCharacteristicsUseCase =
    new SearchAPetForCharacteristicsUseCase(petsRepository)

  return searchAPetForCharacteristicsUseCase
}
