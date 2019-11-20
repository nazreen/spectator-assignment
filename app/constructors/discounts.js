function Discount() {
  this.itemCount = itemsCount[this.itemName]
}

function ApplesDiscount(itemsCount) {
  this.itemName = 'Apples'
  this.discountStatement = 'Apples 10% off'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount > 0
  this.amount = this.itemCount * 0.1
}

function MilkDiscount(itemsCount) {
  this.itemName = 'Milk'
  this.discountStatement = 'Buy 3 Milks and get 50 cents off'
  this.itemCount = itemsCount[this.itemName]
  this.applicable = this.itemCount && this.itemCount >= 3
  this.amount = 0.5
}

module.exports = { ApplesDiscount, MilkDiscount }
