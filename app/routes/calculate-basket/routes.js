const handleCalculateBasket = require('./handleCalculateBasket')
const calculateBasketSchema = require('./calculateBasketSchema')

exports.plugin = {
  name: 'calculate-basket-routes',
  register: server => {
    server.route({
      method: 'GET',
      path: '/calculate',
      handler: handleCalculateBasket,
      config: {
        validate: {
          query: calculateBasketSchema,
          failAction: async (request, h, err) => {
            throw err
          }
        }
      }
    })
  }
}
