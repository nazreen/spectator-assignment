const { round, SafeDec } = require('./../utils/index')

function CurrencyLayer(apiUrl) {
  this.setRate = pairing => {
    this.pairing = pairing
    // TODO: get from api here
    this.rate = 1
  }

  this.convert = value => round(SafeDec.multiply(value, this.rate), 2)
}

module.exports = CurrencyLayer
