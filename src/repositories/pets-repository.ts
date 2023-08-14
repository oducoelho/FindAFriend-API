import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  FindByCity(city: string, page: number): Promise<Pet[] | null>
  FindByName(name: string, page: number): Promise<Pet[] | null>
}
