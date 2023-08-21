import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/createAndAuthenticateOrg'
import { createAndTakePet } from '@/utils/create-and-take-pet'

describe('Search by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search a pet by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    await createAndTakePet(app)

    const response = await request(app.server)
      .get('/pets/by-city')
      .query({
        city: 'São Paulo',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
