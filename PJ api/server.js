const fastify = require('fastify')({ 
    logger: false, 
    ignoreTrailingSlash: true 
})

fastify.post('/test', async (request, reply) => {
    let help = request.body;
    console.log(help);
    reply.code(204);
})

const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()

