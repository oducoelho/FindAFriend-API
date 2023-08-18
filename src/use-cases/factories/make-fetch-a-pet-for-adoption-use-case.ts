import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchAPetForCharacteristicsUseCase } from '../search-a-pet-for-characteristics-use-case'

export function makeFetchAPetForAdoptionUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchAPetForAdoptionUseCase = new SearchAPetForCharacteristicsUseCase(
    petsRepository,
  )

  return fetchAPetForAdoptionUseCase
}
