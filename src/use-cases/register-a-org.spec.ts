import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterAOrgUseCase } from './register-a-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exixts'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterAOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterAOrgUseCase(orgsRepository)
  })
  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'john@doe.com'

    await sut.execute({
      name: 'John Doe',
      email,
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        cep: '13705000',
        endereco: 'john doe address',
        whatsapp: '5599999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
