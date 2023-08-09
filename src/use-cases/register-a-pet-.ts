import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterAPetUseCaseRequest {
  name: string
  description: string
  age: string
  port: string
  energy: string
  organization_id: string
}

interface RegisterAPetUseCaseResponse {
  pet: Pet
}

export class RegisterAPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    port,
    energy,
    organization_id,
  }: RegisterAPetUseCaseRequest): Promise<RegisterAPetUseCaseResponse> {
    const organization = await this.orgsRepository.findById(organization_id)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      port,
      energy,
      organization_id,
    })

    return {
      pet,
    }
  }
}
