import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({
      data,
    })

    return org
  }
}