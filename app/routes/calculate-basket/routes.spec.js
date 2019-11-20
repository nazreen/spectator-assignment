const server = require('../../server.js')
const routes = require('./routes')
const { round, SafeDec } = require('../../utils/index')
const services = require('../../services/index')

function mockCurrencyLayer(apiUrl) {
  const mockPairings = {
    USDEUR: 0.85,
    USDGBP: 0.77
  }
  this.setRate = pairing => {
    this.pairing = pairing
    // TODO: get from api here
    this.rate = mockPairings[pairing]
  }

  this.convert = value => round(SafeDec.multiply(value, this.rate), 2)
}

beforeAll(async () => {
  await server.register([routes])
  spyOn(services, 'CurrencyLayer').and.callFake(mockCurrencyLayer)
})

describe('prelim checks: ', () => {
  it('endpoint exists', async () => {
    const request = {
      method: 'GET',
      url: '/calculate' // deliberately no params
    }
    const response = await server.inject(request)
    expect(response.statusCode).not.toBe(404)
  })
})

describe('payload validation:', () => {
  it('items must be defined', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?currency=USD' // deliberately no items
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.message).toBe('"items" is required')
  })
  it('items must not be empty', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?currency=USD&items=' // items deliberately empty
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.message).toBe('"items" must be an array')
  })

  it('currency must be defined', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Apples' // deliberately no currency
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.message).toBe('"currency" is required')
  })
})

describe('response validation - only USD:', () => {
  it('correctly get Apples discount when only Apples', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Apples,Apples,Apples&currency=USD'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 3.0,
      discounts: ['Apples 10% off'],
      discountAmt: 0.3,
      total: 2.7,
      currency: 'USD'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Apples,Milk,Soup&currency=USD'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 2.8,
      discounts: ['Apples 10% off'],
      discountAmt: 0.1,
      total: 2.7, // 2.7
      currency: 'USD'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk discount when only milk', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk&currency=USD'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 3.45,
      discounts: ['Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.5,
      total: 2.95,
      currency: 'USD'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk and Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk,Apples,Bread&currency=USD'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 5.25,
      discounts: ['Apples 10% off', 'Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.6,
      total: 4.65,
      currency: 'USD'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
})

// TODO: mock USD-EUR exchange rate to be 0.85
describe('response validation - get in EUR:', () => {
  fit('(provided example) correctly get Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Apples,Milk,Soup&currency=EUR'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 2.38,
      discounts: ['Apples 10% off'],
      discountAmt: 0.09, // 0.085
      total: 2.29, // 2.29
      currency: 'EUR'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk discount when only milk', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk&currency=EUR'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 2.93, // 2.9325
      discounts: ['Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.43, // 0.425
      total: 2.5, // 2.5
      currency: 'EUR'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk and Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk,Apples,Bread&currency=EUR'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 4.46, // 4.4625
      discounts: ['Apples 10% off', 'Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.51, // 0.51
      total: 3.95, // 3.95
      currency: 'EUR'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
})

// TODO: mock USD-GBP exchange rate to be 0.77
describe('response validation - get in GBP:', () => {
  it('correctly get Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Apples,Milk,Soup&currency=GBP'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 2.16, // 2.156
      discounts: ['Apples 10% off'],
      discountAmt: 0.08, // 0.077
      total: 2.08, // 2.08
      currency: 'GBP'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk discount when only milk', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk&currency=GBP'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 2.66, // 2.6565
      discounts: ['Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.39, // 0.385
      total: 2.27, // 2.27
      currency: 'GBP'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
  it('correctly get Milk and Apples discount when mixed basket', async () => {
    const request = {
      method: 'GET',
      url: '/calculate?items=Milk,Milk,Milk,Apples,Bread&currency=GBP'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const expectedResult = {
      subtotal: 4.04, // 4.0425
      discounts: ['Apples 10% off', 'Buy 3 Milks and get 50 cents off'],
      discountAmt: 0.46, // 0.462
      total: 3.58, // 3.5805
      currency: 'GBP'
    }
    expect({ ...response.result }).toEqual(expectedResult)
  })
})
