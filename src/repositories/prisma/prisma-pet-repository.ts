import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async FindByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: { city },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}