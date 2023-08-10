import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterAPetUseCase } from './register-a-pet-'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterAPetUseCase

describe('Register a pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterAPetUseCase(petsRepository, orgsRepository)
  })
  it('should be able to register a pet', async () => {
    const { id } = await orgsRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cep: '13705000',
      address: 'john doe address',
      phone_number: '5599999999',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      name: 'cão',
      description: 'Cachorro',
      age: '8',
      city: 'San Francisco',
      energy: '4',
      organizationId: id,
      port: 'medium',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('cão')
  })
})
