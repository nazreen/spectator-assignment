const { BasketCost } = require('../../constructors/index')
const PriceList = require('../../services/priceList')
const { ApplesDiscount, MilkDiscount } = require('../../constructors/discounts')
function handleCalculateBasket(request, h) {
  try {
    const { items, currency } = request.query
    const USDPriceList = new PriceList(currency)
    const output = new BasketCost(items, currency, USDPriceList.get(), [
      ApplesDiscount,
      MilkDiscount
    ])
    return output
  } catch (e) {
    throw e
  }
}
module.exports = handleCalculateBasket
module.exports.BasketCost = BasketCost
