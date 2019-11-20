const { ApplesDiscount, MilkDiscount } = require('./discounts')

fit('ApplesDiscount', () => {
  const result = new ApplesDiscount({ Apples: 2 })
  expect(result.itemName).toEqual('Apples')
  expect(result.discountStatement).toEqual('Apples 10% off')
  expect(result.itemCount).toEqual(2)
  expect(result.applicable).toEqual(true)
  expect(result.amount).toEqual(0.2)
})
