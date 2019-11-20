const { BasketCost } = require('../../constructors/index')
const { CurrencyLayer, PriceList } = require('../../services/index')
const { ApplesDiscount, MilkDiscount } = require('../../constructors/discounts')
function handleCalculateBasket(request, h) {
  try {
    const { items, currency } = request.query
    console.log(items)
    const USDPriceList = new PriceList('USD')
    const output = new BasketCost(items, currency, USDPriceList.get(), [
      ApplesDiscount,
      MilkDiscount
    ])
    if (currency !== 'USD') {
      const currencyLayer = new CurrencyLayer()
      currencyLayer.setRate(`USD-${currency}`)
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
