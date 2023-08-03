// Require the framework and instantiate it
const Fastify = require('fastify')// ({ logger: true })
const cors = require('@fastify/cors')

const fastify = Fastify()
//fastify.use(cors());


// const register = async () => {
//   try{
//     fastify.register(cors, { 
//   origin: "http://127.0.0.1:5173",
//   methods: ['GET', 'POST', 'PUT']
// })
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
// register()

fastify.register(cors, {
  origin: "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
})

// fastify.register(cors, {
//   origin: "http://localhost:3000", 
//   methods: ['GET', 'POST', 'PUT'],
//   credentials: true
// })

// Connect to database
fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root@localhost/ns_trial'
})

// Create
// Read
// Update
// Delete

// Declare read routes
fastify.get('/', function handler (request, reply) {
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

// Declare create routes
fastify.post('/createBlog', function(req, reply) {
  var data = JSON.parse(req.body);
  console.log(data + '// DR')
    fastify.mysql.query(
      'INSERT INTO `blogs` (`Title`, `User`, `User_Id`, `Description`) VALUES (?,?,?,?)', [data.Title, data.User, data.Userid, data.Description], 
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