import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exixts'
import { Organization } from '@prisma/client'

interface RegisterAOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  endereco: string
  whatsapp: string
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
    endereco,
    name,
    whatsapp,
    password,
  }: RegisterAOrgUseCaseRequest): Promise<RegisterAOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      cep,
      email,
      endereco,
      name,
      whatsapp,
      password_hash,
    })

    return {
      org,
    }
  }
}
