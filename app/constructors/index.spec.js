const {
  BasketCost,
  DiscountCalculation,
  ItemsCount,
  Subtotal
} = require('./index')
const { ApplesDiscount, MilkDiscount } = require('./discounts')
const priceList = require('../data/priceList')

describe('ItemsCount', () => {
  it('given items, generates list accurately', () => {
    const items = ['Apples', 'Apples', 'Milk']
    const result = new ItemsCount(items).dict
    expect(result).toEqual({ Apples: 2, Milk: 1 })
  })

  it('given items, generates list accurately', () => {
    const items = ['Apples', 'Apples', 'Milk', 'Bread']
    const result = new ItemsCount(items, 'USD').dict
    expect(result).toEqual({ Apples: 2, Milk: 1, Bread: 1 })
  })
})

describe('Subtotal: ', () => {
  it('calculates : Apples,Apples', () => {
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

describe('DiscountCalculation: ', () => {
  it('no discount: bread only', () => {
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
    expect(result.discounts).toEqual(['Apples 10% off'])
    expect(result.discountAmt).toEqual(0.2)
  })
  it('milk discount', () => {
    const itemsCount = { Bread: 2, Milk: 3 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual(['Buy 3 Milks and get 50 cents off'])
    expect(result.discountAmt).toEqual(0.5)
  })
  it('apple discount', () => {
    const itemsCount = { Apples: 2, Milk: 1 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual(['Apples 10% off'])
    expect(result.discountAmt).toEqual(0.2)
  })
  it('milk and apples discount', () => {
    const itemsCount = { Apples: 1, Milk: 3 }
    const activeDiscounts = [ApplesDiscount, MilkDiscount]
    const result = new DiscountCalculation(itemsCount, activeDiscounts)
    expect(result.discounts).toEqual([
      'Apples 10% off',
      'Buy 3 Milks and get 50 cents off'
    ])
    expect(result.discountAmt).toEqual(0.6)
  })
})
