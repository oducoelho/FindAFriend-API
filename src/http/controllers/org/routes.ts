import { FastifyInstance } from 'fastify'
import { registerAOrg } from './register-a-org'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', registerAOrg)
  app.post('/sessions', authenticate)

  app.get('/me', profile)
}
