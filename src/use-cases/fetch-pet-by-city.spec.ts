import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetByCityUseCase } from './fetch-pet-by-city'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCityUseCase

describe('Fetch Pet By Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCityUseCase(petsRepository)
  })
  it('should be able to fetch pets by city', async () => {
    await petsRepository.create({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      city: 'San Francisco',
      energy: '4',
      port: 'medium',
      organization_id: '23',
    })

    const { pet } = await sut.execute({
      city: 'San Francisco',
      page: 1,
    })

    expect(pet).toHaveLength(1)
    expect(pet).toEqual([expect.objectContaining({ city: 'San Francisco' })])
  })
})
