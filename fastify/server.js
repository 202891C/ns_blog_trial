// Require the framework and instantiate it
const Fastify = require('fastify')// ({ logger: true })
const cors = require('@fastify/cors')

const fastify = Fastify()

// Bypass Access-Control-Allow-Origin using Cors on backend
fastify.register(cors, {
  origin: "http://localhost:5173", 
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true
})

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
    // reply.redirect("https://fastify.dev/") // note to redirect pages
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
    'SELECT Id, Title, User, DATE(Date) Date, Description FROM blogs ORDER BY Id ASC',
    function onResult (err, result) {
      console.log(result)
      reply.send(err || result)
    }
  )
})

fastify.get('/present', function(req, reply) {
  fastify.mysql.query(
    'SELECT password FROM present',
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.get('/present/:id', function(req, reply) {
  fastify.mysql.query(
    'SELECT p_Id, password FROM present WHERE p_Id=?', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.get('/users', function(req, reply){
  fastify.mysql.query(
    'SELECT User_Id, User FROM users',
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.get('/users/:id', function(req, reply){
  fastify.mysql.query(
    'SELECT User_Id, User FROM users WHERE User_Id=?', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

fastify.post('/users/present', function(req, reply){
  var data = JSON.parse(req.body);
  // data.User, data.Present
  fastify.mysql.query(
    'SELECT u.User, p.password FROM `users` u INNER JOIN `present` p ON u.p_Id = p.p_Id where u.User = ? and p.password = ?', [data.User, data.Present],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})


// Declare create routes
// create blogs
fastify.post('/createBlog', function(req, reply) {
  var data = JSON.parse(req.body); // convert string to JSON object
    fastify.mysql.query(
      'INSERT INTO `blogs` (`Title`, `User`, `User_Id`, `Description`) VALUES (?,?,?,?)', [data.Title, data.User, data.Userid, data.Description], 
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
})

//create user and password
fastify.post('/users', function(req, reply){
  var data = JSON.parse(req.body);
  fastify.mysql.query(
    'INSERT INTO `present` (password) VALUES (?);', [data.Present],
    function onResult (err, result) {
      fastify.mysql.query(
      'INSERT INTO `users` (User, p_Id) VALUES (?, (SELECT p_Id from `present` ORDER BY p_Id DESC LIMIT 1));', [data.User, data.Present],
      function onResult (err, result) {
        reply.send(err || result)
        })
    }
  )
})

// Declare upload routes
fastify.post('/editBlog', function(req, reply) {
  var data = JSON.parse(req.body); // convert string to JSON object
    fastify.mysql.query(
      'UPDATE `blogs` Set `Title` = ?, `User` = ?, `User_Id` = ?, `Description` = ? WHERE Id = ?', [data.Title, data.User, data.Userid, data.Description, data.Id], 
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
})

// Declare delete routes
fastify.delete('/deleteBlog/:id', function(req, res){
  fastify.mysql.query(
    'DELETE from blogs WHERE id=?', [req.params.id],
    function onResult (err, result) {
      res.send(err || result)
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