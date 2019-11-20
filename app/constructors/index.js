function ItemsCount(items) {
  this.dict = {}
  items.forEach(x => {
    this.dict[x] ? this.dict[x]++ : (this.dict[x] = 1)
  })
}

function Subtotal(itemsCount, priceList) {
  let subtotal = 0
  Object.keys(itemsCount).forEach(item => {
    subtotal += priceList[item] * itemsCount[item]
  })
  this.subtotal = subtotal
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
