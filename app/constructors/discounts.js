function Discount() {
  this.itemCount = itemsCount[this.itemName]
}

function ApplesDiscount(itemsCount) {
  this.itemName = 'Apples'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount > 0
  if (!this.applicable) return
  this.discountStatement = this.applicable ? 'Apples 10% off' : null
  this.amount = this.itemCount * 0.1
}

function MilkDiscount(itemsCount) {
  this.itemName = 'Milk'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount >= 3
  if (!this.applicable) return
  this.discountStatement = this.applicable
    ? 'Buy 3 Milks and get 50 cents off'
    : null
  this.amount = 0.5
}

module.exports = { ApplesDiscount, MilkDiscount }
