const { BasketCost } = require('../../constructors/index')
const services = require('../../services/index')
const { ApplesDiscount, MilkDiscount } = require('../../constructors/discounts')
const API_URL = 'http://apilayer.net/api/live'
const API_KEY = 'API_KEY_HERE'
async function handleCalculateBasket(request, h) {
  try {
    const { items, currency } = request.query
    const USDPriceList = new services.PriceList('USD')
    const output = new BasketCost(items, currency, USDPriceList.get(), [
      ApplesDiscount,
      MilkDiscount
    ])
    if (currency !== 'USD') {
      const currencyLayer = new services.CurrencyLayer(API_URL, API_KEY)
      await currencyLayer.setRate(`USD${currency}`)
      output.subtotal = currencyLayer.convert(output.subtotal)
      output.discountAmt = currencyLayer.convert(output.discountAmt)
      output.total = output.subtotal - output.discountAmt
    }
    return output
  } catch (e) {
    throw e
  }
}
module.exports = handleCalculateBasket
module.exports.BasketCost = BasketCost
