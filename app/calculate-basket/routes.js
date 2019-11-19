const handleCalculateBasket = require('./handleCalculateBasket')

exports.plugin = {
  name: 'calculate-basket-routes',
  register: server => {
    server.route({
      method: 'GET',
      path: '/calculate',
      handler: handleCalculateBasket
    })
  }
}
