const { ApplesDiscount, MilkDiscount } = require('./discounts')

fdescribe('ApplesDiscount:', () => {
  fit('when not applicable', () => {
    const result = new ApplesDiscount({ Bread: 2 })
    expect(result.itemName).toEqual('Apples')
    expect(result.discountStatement).not.toBeDefined()
    expect(result.itemCount).not.toBeDefined()
    expect(result.applicable).not.toBeDefined()
    expect(result.amount).not.toBeDefined()
  })
  fit('when applicable', () => {
    const result = new ApplesDiscount({ Apples: 2 })
    expect(result.itemName).toEqual('Apples')
    expect(result.discountStatement).toEqual('Apples 10% off')
    expect(result.itemCount).toEqual(2)
    expect(result.applicable).toEqual(true)
    expect(result.amount).toEqual(0.2)
  })
})

fdescribe('MilkDiscount: ', () => {
  fit('when not applicable', () => {
    const result = new MilkDiscount({ Milk: 2 })
    expect(result.itemName).toEqual('Milk')
    expect(result.itemCount).toEqual(2)
    expect(result.applicable).toEqual(false)
    expect(result.discountStatement).not.toBeDefined()
    expect(result.amount).toEqual(undefined)
  })
})
