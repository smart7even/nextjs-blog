// Import the framework and instantiate it
import Fastify from 'fastify'
import { PrismaClient } from '../generated/client'
const prisma = new PrismaClient()

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
    let users = await prisma.user.findMany();

    console.log(users);

    return { users }
})

// Run the server!

async function main() {
    try {
        await fastify.listen({ port: 3001 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

main()
