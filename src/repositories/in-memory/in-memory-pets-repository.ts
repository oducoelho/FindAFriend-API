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
      characteristics: data.characteristics,
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

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.city.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async FindByCharacteristics(characteristics: string, page: number) {
    const pet = this.items
      .filter((item) => item.characteristics === characteristics)
      .slice((page - 1) * 20, page * 20)

    if (!pet) {
      return null
    }

    return pet
  }
}
