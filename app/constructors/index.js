function ItemsCount(items) {
  this.dict = {}
  items.forEach(x => {
    this.dict[x] ? this.dict[x]++ : (this.dict[x] = 1)
  })
}

function Subtotal(itemsCount, priceList) {
  this.subtotal = 0
}

function BasketCost(items, currency) {
  this.output = 'harlowla'
  this.itemsCount = new ItemsCount(items).dict
}

module.exports = {
  ItemsCount,
  Subtotal,
  BasketCost
}
