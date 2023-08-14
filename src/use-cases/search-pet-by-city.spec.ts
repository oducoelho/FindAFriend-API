import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetByCityUseCase } from './search-pet-by-city'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetByCityUseCase

describe('Search Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetByCityUseCase(petsRepository)
  })
  it('should be able to search pets by city', async () => {
    await petsRepository.create({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      city: 'San Francisco',
      energy: '4',
      port: 'medium',
      organization_id: '23',
    })

    await petsRepository.create({
      name: 'cão 2',
      description: 'Cachorro',
      age: '8',
      city: 'San Francisco',
      energy: '4',
      port: 'medium',
      organization_id: '23',
    })

    const { pet } = await sut.execute({
      query: 'San Francisco',
      page: 1,
    })

    expect(pet).toHaveLength(1)
    expect(pet).toEqual([expect.objectContaining({ city: 'San Francisco' })])
  })

  // it('should be able to fetch paginated pets search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await petsRepository.create({
  //       name: `cão ${i}`,
  //       description: 'Cachorro',
  //       age: '8',
  //       city: 'San Francisco',
  //       energy: '4',
  //       port: 'medium',
  //       organization_id: '23',
  //     })
  //   }

  //   const { pet } = await sut.execute({
  //     page: 2,
  //     query: 'cão',
  //   })

  //   expect(pet).toHaveLength(2)
  //   expect(pet).toEqual([
  //     expect.objectContaining({ name: 'cão 21' }),
  //     expect.objectContaining({ name: 'cão 22' }),
  //   ])
  // })
})
