import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const example: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', async function () {
    return 'this is an example'
  })
}

export default example
