const { BasketCost, Subtotal } = require('./index')
const priceList = require('../data/priceList')

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

fdescribe('Subtotal: ', () => {
  fit('calculates : Apples,Apples', () => {
    const itemsCount = { Apples: 2 }
    const result = new Subtotal(itemsCount, priceList['USD']).subtotal
    expect(result).toEqual(2.0)
  })
  fit('calculates correctly: Apples, Milk', () => {
    const itemsCount = { Apples: 1, Milk: 1 }
    const result = new Subtotal(itemsCount, priceList['USD']).subtotal
    expect(result).toEqual(2.15)
  })
})
