import { Organization, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
