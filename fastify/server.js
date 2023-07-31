// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

{/* <script>const cors = require("cors");</script> */}

fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root@localhost/ns_trial'
})

// Declare a route
fastify.get('/routes', function handler (request, reply) {
    // reply.redirect("https://fastify.dev/")
    reply.send({ hello: 'world' })
})

fastify.get('/blog/:id', function(req, reply) {
    fastify.mysql.query(
      'SELECT Id, Title, User, Date, Description FROM blogs WHERE id=?', [req.params.id],
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
})

fastify.get('/blog', function(req, reply) {
  fastify.mysql.query(
    'SELECT Id, Title, User, Date, Description FROM blogs',
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
})

// "npm install fastify"
// 'Using CJS codes, launch with "node server" and test on curl "http://localhost:3000"'
// https://fastify.dev/