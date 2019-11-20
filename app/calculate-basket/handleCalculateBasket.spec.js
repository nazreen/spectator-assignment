const { BasketCost } = require('./handleCalculateBasket')

it('given items, generates list accurately', () => {
  const items = ['Apples', 'Apples', 'Milk']
  const result = new BasketCost(items, 'USD').itemsCount
  expect(result).toEqual({ Apples: 2, Milk: 1 })
})

it('given items, generates list accurately', () => {
  const items = ['Apples', 'Apples', 'Milk', 'Bread']
  const result = new BasketCost(items, 'USD').itemsCount
  expect(result).toEqual({ Apples: 2, Milk: 1, Bread: 1 })
})
