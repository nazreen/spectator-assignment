const priceList = {
  USD: {
    Soup: 0.65,
    Bread: 0.8,
    Milk: 1.15,
    Apples: 1.0
  }
}

function getPriceList(currency) {
  return priceList[currency]
}

module.exports = getPriceList
