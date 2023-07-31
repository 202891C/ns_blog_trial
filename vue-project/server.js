var port = 3000;

const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', function handler (request, reply) {
    reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: port }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  else {
    console.log('Server started on port ' + port);
  }
})