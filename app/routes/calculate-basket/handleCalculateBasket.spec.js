const { BasketCost, Subtotal } = require('./handleCalculateBasket')

describe('BasketCost', () => {
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
})

fdescribe('Subtotal', () => {
  fit('calculates correctly', () => {
    const itemsCount = { Apples: 2 }
    const result = new Subtotal(itemsCount, 'USD').subtotal
    expect(result).toEqual(2.0)
  })
  it('calculates correctly', () => {
    const itemsCount = { Apples: 1, Milk: 1.15 }
    const result = new Subtotal(itemsCount, 'USD').subtotal
    expect(result).toEqual(2.15)
  })
})
