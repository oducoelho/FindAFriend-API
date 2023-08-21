import { FastifyInstance } from 'fastify'
import { registerAPet } from './register-a-pet'
import { searchPetByCity } from './search-pet-by-city'
import { SearchAPetForCharacteristics } from './search-a-pet-for-characteristics-use-case'
export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerAPet)

  app.get('/pets/by-city', searchPetByCity)
  app.get('/pets/by-characteristics', SearchAPetForCharacteristics)
}
