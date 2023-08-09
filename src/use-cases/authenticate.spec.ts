import { describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should be able to authenticate with wrong email', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should be able to authenticate with wrong password', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      cep: '13705000',
      endereco: 'john doe address',
      whatsapp: '5599999999',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
