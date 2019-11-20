const priceList = require('../data/priceList')

function PriceList(currency) {
  this.get = () => priceList[currency]
}

module.exports = PriceList
