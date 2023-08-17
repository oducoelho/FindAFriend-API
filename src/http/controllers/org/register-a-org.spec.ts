import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'ORG1',
      email: 'ORG@example.COM',
      cep: '13705000',
      address: 'addressExample',
      phone_number: '12345678',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
