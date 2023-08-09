import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exixts'
import { Organization } from '@prisma/client'

interface RegisterAOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  phone_number: string
  password: string
}

interface RegisterAOrgUseCaseResponse {
  org: Organization
}

export class RegisterAOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cep,
    email,
    address,
    name,
    phone_number,
    password,
  }: RegisterAOrgUseCaseRequest): Promise<RegisterAOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      cep,
      phone_number,
    })

    return {
      org,
    }
  }
}
