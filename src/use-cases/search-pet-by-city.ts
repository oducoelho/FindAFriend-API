import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetByCityUseCaseRequest {
  city: string
  page: number
}

interface SearchPetByCityUseCaseResponse {
  pet: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: SearchPetByCityUseCaseRequest): Promise<SearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.searchMany(city, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
