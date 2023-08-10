import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetByIdUseCaseRequest {
  city: string
  page: number
}

interface FetchPetByIdUseCaseResponse {
  pet: Pet[]
}

export class FetchPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchPetByIdUseCaseRequest): Promise<FetchPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.FindByCity(city, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
