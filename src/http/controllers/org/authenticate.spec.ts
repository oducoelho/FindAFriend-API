import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ORG1',
      email: 'ORG@example.COM',
      cep: '13705000',
      address: 'addressExample',
      phone_number: '12345678',
      password: '123456',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'ORG@example.COM',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
