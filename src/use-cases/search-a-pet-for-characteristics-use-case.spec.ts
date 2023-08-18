import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchAPetForCharacteristicsUseCase } from './search-a-pet-for-characteristics-use-case'

let petsRepository: InMemoryPetsRepository
let sut: SearchAPetForCharacteristicsUseCase

describe('Search Pet By Characteristics Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchAPetForCharacteristicsUseCase(petsRepository)
  })
  it('should be able to search pets by characteristics', async () => {
    await petsRepository.create({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      characteristics: 'Preto e branco',
      city: 'San Francisco',
      energy: '4',
      port: 'medium',
      organization_id: '23',
    })

    const { pet } = await sut.execute({
      characteristics: 'Preto e branco',
      page: 1,
    })

    expect(pet).toHaveLength(1)
    expect(pet).toEqual([expect.objectContaining({ city: 'San Francisco' })])
  })
})
