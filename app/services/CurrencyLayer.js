const axios = require('axios')
const { round, SafeDec } = require('./../utils/index')

function CurrencyLayer(apiUrl, apiKey) {
  this.apiUrl = apiUrl
  this.apiKey = apiKey
  this.getQuotes = async () => {
    const data = (await axios.get(`${this.apiUrl}?access_key=${this.apiKey}`))
      .data
    this.quotes = data.quotes
    this.last_update = data.timestamp
  }
  this.setRate = async pairing => {
    await this.getQuotes()
    this.pairing = pairing
    this.rate = this.quotes[pairing]
  }

  this.convert = value => round(SafeDec.multiply(value, this.rate), 2)
}

module.exports = CurrencyLayer
