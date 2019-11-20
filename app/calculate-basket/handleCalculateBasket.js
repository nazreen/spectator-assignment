function ItemsCount(items) {
  this.dict = {}
  items.forEach(x => {
    this.dict[x] ? this.dict[x]++ : (this.dict[x] = 1)
  })
}

function BasketCost(items, currency) {
  this.output = 'harlowla'
  this.itemsCount = new ItemsCount(items).dict
}

function handleCalculateBasket(request, h) {
  const { items, currency } = request.url.searchParams
  const { output } = new BasketCost(items, currency)
  return output
}
module.exports = handleCalculateBasket
module.exports.BasketCost = BasketCost
