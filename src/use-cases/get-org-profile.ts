import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetOrgProfileUseCaseRequest {
  organization_id: string
}

interface GetOrgProfileUseCaseResponse {
  org: Organization
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    organization_id,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(organization_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
