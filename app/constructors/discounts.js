function ApplesDiscount(itemsCount) {
  this.itemName = 'Apples'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount > 0
  if (!this.applicable) return
  this.discountStatement = this.applicable ? 'Apples 10% off' : null
  this.amount = (this.itemCount * (0.1 * 10)) / 10 // for JS's decimal multiplication problem
}

function MilkDiscount(itemsCount) {
  this.itemName = 'Milk'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount >= 3
  if (!this.applicable) return
  this.discountStatement = this.applicable
    ? '50 cents off with purchase of 3 Milks'
    : null
  this.amount = 0.5
}

module.exports = { ApplesDiscount, MilkDiscount }
