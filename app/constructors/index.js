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

function DiscountCalculation(itemsCount, activeDiscounts) {
  let discountAmt = 0
  // for every activeDiscount, apply and amend discounts and discountAmt
  const discounts = activeDiscounts.map(
    activeDiscount => new activeDiscount(itemsCount)
  )

  this.discounts = [] // join
  this.discountAmt = discountAmt
}

function BasketCost(items, currency, priceList) {
  this.itemsCount = new ItemsCount(items).dict
  this.subtotal = new Subtotal(this.itemsCount, priceList)
  const discountCalculation = new DiscountCalculation(itemsCount, [])
  this.discounts = discountCalculation.discounts
  this.discountAmt = discountCalculation.discountAmt
  this.total = this.subtotal - this.discounts
}

module.exports = {
  ItemsCount,
  Subtotal,
  DiscountCalculation,
  BasketCost
}
