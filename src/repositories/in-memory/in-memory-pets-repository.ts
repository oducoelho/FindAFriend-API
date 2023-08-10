import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      city: data.city,
      port: data.port,
      energy: data.energy,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async FindByCity(city: string, page: number) {
    const pet = this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!pet) {
      return null
    }

    return pet
  }
}