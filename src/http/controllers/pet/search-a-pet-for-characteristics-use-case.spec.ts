import { app } from '@/app'
import { createAndTakePet } from '@/utils/create-and-take-pet'
import { createAndAuthenticateOrg } from '@/utils/createAndAuthenticateOrg'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search a Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a pet with characteristics', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    await createAndTakePet(app)

    const response = await request(app.server)
      .get('/pets/by-characteristics')
      .query({
        characteristics: 'Preto e branco',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
