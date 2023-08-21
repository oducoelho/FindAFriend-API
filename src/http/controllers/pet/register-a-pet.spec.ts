import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/createAndAuthenticateOrg'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register a Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register a pet', async () => {
    const { token, organization_id } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'cão',
        description: 'Cachorro',
        age: '8',
        city: 'San Francisco',
        characteristics: 'Preto e branco',
        energy: '4',
        organization_id,
        port: 'medium',
      })

    expect(response.statusCode).toEqual(201)
  })
})
