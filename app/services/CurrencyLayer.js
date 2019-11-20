const { SafeDec } = require('./../utils/index')
const mockPairings = {
  'USD-EUR': 0.85,
  'USD-GBP': 0.77
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

function CurrencyLayer(apiUrl) {
  this.setRate = pairing => {
    this.pairing = pairing
    // TODO: get from api here
    this.rate = mockPairings[pairing]
  }

  this.convert = value => round(SafeDec.multiply(value, this.rate), 2)
}

module.exports = CurrencyLayer
