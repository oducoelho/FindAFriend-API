import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchAPetForAdoptionUseCaseRequest {
  name: string
  page: number
}

interface FetchAPetForAdoptionUseCaseResponse {
  pet: Pet[]
}

export class FetchAPetForAdoptionUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    page,
  }: FetchAPetForAdoptionUseCaseRequest): Promise<FetchAPetForAdoptionUseCaseResponse> {
    const pet = await this.petsRepository.FindByName(name, page)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
