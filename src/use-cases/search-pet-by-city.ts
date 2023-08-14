import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetByCityUseCaseRequest {
  query: string
  page: number
}

interface SearchPetByCityUseCaseResponse {
  pet: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetByCityUseCaseRequest): Promise<SearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.searchMany(query, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
