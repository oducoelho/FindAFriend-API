import { FastifyInstance } from 'fastify'
import { registerAOrg } from './register-a-org'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerAOrg)
  app.post('/sessions', authenticate)
}
