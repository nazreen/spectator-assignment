const { ApplesDiscount, MilkDiscount } = require('./discounts')

describe('ApplesDiscount:', () => {
  it('when not applicable', () => {
    const result = new ApplesDiscount({ Bread: 2 })
    expect(result.itemName).toEqual('Apples')
    expect(result.discountStatement).not.toBeDefined()
    expect(result.itemCount).not.toBeDefined()
    expect(result.applicable).not.toBeDefined()
    expect(result.amount).not.toBeDefined()
  })
  it('when applicable', () => {
    const result = new ApplesDiscount({ Apples: 2 })
    expect(result.itemName).toEqual('Apples')
    expect(result.discountStatement).toEqual('Apples 10% off')
    expect(result.itemCount).toEqual(2)
    expect(result.applicable).toEqual(true)
    expect(result.amount).toEqual(0.2)
  })
})

describe('MilkDiscount: ', () => {
  it('when not applicable', () => {
    const result = new MilkDiscount({ Milk: 2 })
    expect(result.itemName).toEqual('Milk')
    expect(result.itemCount).toEqual(2)
    expect(result.applicable).toEqual(false)
    expect(result.discountStatement).not.toBeDefined()
    expect(result.amount).toEqual(undefined)
  })
  it('when applicable', () => {
    const result = new MilkDiscount({ Milk: 3, Bread: 1 })
    expect(result.itemName).toEqual('Milk')
    expect(result.itemCount).toEqual(3)
    expect(result.applicable).toEqual(true)
    expect(result.discountStatement).toEqual('Buy 3 Milks and get 50 cents off')
    expect(result.amount).toEqual(0.5)
  })
})
