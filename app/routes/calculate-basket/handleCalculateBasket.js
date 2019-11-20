const { BasketCost, ItemsCount, Subtotal } = require('../../constructors/index')

function handleCalculateBasket(request, h) {
  const { items, currency } = request.url.searchParams
  const { output } = new BasketCost(items, currency)
  return output
}
module.exports = handleCalculateBasket
module.exports.BasketCost = BasketCost
module.exports.Subtotal = Subtotal
