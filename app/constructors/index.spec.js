const {
  BasketCost,
  DiscountCalculation,
  ItemsCount,
  Subtotal
} = require('./index')
const { ApplesDiscount, MilkDiscount } = require('./discounts')
const priceList = require('../data/priceList')

fdescribe('ItemsCount', () => {
  fit('given items, generates list accurately', () => {
    const items = ['Apples', 'Apples', 'Milk']
    const result = new ItemsCount(items).dict
    expect(result).toEqual({ Apples: 2, Milk: 1 })
  })

  fit('given items, generates list accurately', () => {
    const items = ['Apples', 'Apples', 'Milk', 'Bread']
    const result = new ItemsCount(items, 'USD').dict
    expect(result).toEqual({ Apples: 2, Milk: 1, Bread: 1 })
  })
})

describe('Subtotal: ', () => {
  fit('calculates : Apples,Apples', () => {
    const itemsCount = { Apples: 2 }
    const result = new Subtotal(itemsCount, priceList['USD']).subtotal
    expect(result).toEqual(2.0)
  })
  it('calculates correctly: Apples, Milk', () => {
    const itemsCount = { Apples: 1, Milk: 1 }
    const result = new Subtotal(itemsCount, priceList['USD']).subtotal
    expect(result).toEqual(2.15)
  })
})

fdescribe('DiscountCalculation: ', () => {
  fit('no discount: bread only', () => {
    const itemsCount = { Bread: 1 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual([])
    expect(result.discountAmt).toEqual(0)
  })
  it('apple discount', () => {
    const itemsCount = { Apples: 2, Milk: 1 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual(['Apples 10% discount'])
    expect(result.discountAmt).toEqual(0.2)
  })
  it('milk discount', () => {
    const itemsCount = { Bread: 2, Milk: 3 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual(['50 cent discount when buying 3 Milks'])
    expect(result.discountAmt).toEqual(0.5)
  })
})
