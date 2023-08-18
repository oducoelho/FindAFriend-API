import { FastifyInstance } from 'fastify'
import { registerAOrg } from './register-a-org'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerAOrg)
  app.post('/sessions', authenticate)

  // Authenticate
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
