import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exixts'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const email = 'john@doe.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
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
