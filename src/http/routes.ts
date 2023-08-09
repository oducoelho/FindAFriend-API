import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { autheticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', register)
  app.post('/sessions', autheticate)
}
