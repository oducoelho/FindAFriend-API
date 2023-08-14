import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchAPetForAdoptionUseCase } from './fetch-a-pet-for-adoption'

let petsRepository: InMemoryPetsRepository
let sut: FetchAPetForAdoptionUseCase

describe('Fetch Pet By Name Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAPetForAdoptionUseCase(petsRepository)
  })
  it('should be able to fetch pets by name', async () => {
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
      name: 'cão',
      page: 1,
    })

    expect(pet).toHaveLength(1)
    expect(pet).toEqual([expect.objectContaining({ name: 'cão' })])
  })
})
