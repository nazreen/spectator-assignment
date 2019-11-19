const server = require('./server.js')
const calculateBasketRoutes = require('./calculate-basket/routes')

const routes = [calculateBasketRoutes]

const init = async () => {
  await server.register(routes)
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
