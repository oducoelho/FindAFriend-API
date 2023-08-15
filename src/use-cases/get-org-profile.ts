import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}

interface GetOrgProfileUseCaseResponse {
  org: Organization
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
