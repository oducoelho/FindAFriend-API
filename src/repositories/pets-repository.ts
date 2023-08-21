import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(city: string, page: number): Promise<Pet[]>
  FindByCharacteristics(
    characteristics: string,
    page: number,
  ): Promise<Pet[] | null>
}
