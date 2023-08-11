import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetByCityUseCaseRequest {
  city: string
  page: number
}

interface FetchPetByCityUseCaseResponse {
  pet: Pet[]
}

export class FetchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchPetByCityUseCaseRequest): Promise<FetchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.FindByCity(city, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
