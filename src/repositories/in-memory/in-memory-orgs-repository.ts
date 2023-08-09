import { Organization, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Organization[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      phone_number: data.phone_number,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
