const { SafeDec } = require('../utils/index')

function ItemsCount(items) {
  this.dict = {}
  items.forEach(x => {
    this.dict[x] ? this.dict[x]++ : (this.dict[x] = 1)
  })
}

function Subtotal(itemsCount, priceList) {
  let subtotal = 0
  Object.keys(itemsCount).forEach(item => {
    subtotal += SafeDec.multiply(priceList[item], itemsCount[item])
  })
  this.subtotal = subtotal
}

function DiscountCalculation(itemsCount, activeDiscounts = []) {
  // for every activeDiscount, apply and amend discounts and discountAmt
  const calculatedDiscounts = activeDiscounts.map(
    activeDiscount => new activeDiscount(itemsCount)
  )
  const appliedDiscounts = calculatedDiscounts.filter(x => x.applicable)
  this.discounts = appliedDiscounts.map(x => x.discountStatement)
  const reducer = (a, b) => a + b.amount
  this.discountAmt =
    appliedDiscounts.length > 0 ? appliedDiscounts.reduce(reducer, 0) : 0
}

function BasketCost(items, currency, priceList, activeDiscounts) {
  const itemsCount = new ItemsCount(items).dict
  this.subtotal = new Subtotal(itemsCount, priceList).subtotal
  const discountCalculation = new DiscountCalculation(
    itemsCount,
    activeDiscounts
  )
  this.discounts = discountCalculation.discounts
  this.discountAmt = discountCalculation.discountAmt
  this.currency = currency
  this.total = SafeDec.subtract(this.subtotal, this.discountAmt)
}

module.exports = {
  ItemsCount,
  Subtotal,
  DiscountCalculation,
  BasketCost
}
