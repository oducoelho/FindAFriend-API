import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchAPetForCharacteristicsUseCaseRequest {
  characteristics: string
  page: number
}

interface SearchAPetForCharacteristicsUseCaseResponse {
  pet: Pet[]
}

export class SearchAPetForCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    characteristics,
    page,
  }: SearchAPetForCharacteristicsUseCaseRequest): Promise<SearchAPetForCharacteristicsUseCaseResponse> {
    const pet = await this.petsRepository.FindByCharacteristics(
      characteristics,
      page,
    )

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
