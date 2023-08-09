import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exixts'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cep: string
  endereco: string
  whatsapp: string
  password: string
}

interface RegisterUseCaseResponse {
  org: Organization
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cep,
    email,
    endereco,
    name,
    whatsapp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
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
