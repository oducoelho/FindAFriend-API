import { FastifyInstance } from 'fastify'
import { registerAOrg } from './controllers/org/register-a-org'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', registerAOrg)
  app.post('/sessions', authenticate)
}
