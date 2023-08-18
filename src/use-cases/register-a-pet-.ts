import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterAPetUseCaseRequest {
  name: string
  description: string
  age: string
  characteristics: string
  city: string
  port: string
  energy: string
  organizationId: string
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
    characteristics,
    city,
    port,
    energy,
    organizationId,
  }: RegisterAPetUseCaseRequest): Promise<RegisterAPetUseCaseResponse> {
    const organization = await this.orgsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      characteristics,
      age,
      city,
      port,
      energy,
      organization_id: organizationId,
    })

    return {
      pet,
    }
  }
}
