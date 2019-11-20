function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

const SafeDec = {
  subtract: (a, b) => (a * 10 - b * 10) / 10,
  multiply: (a, b) => (a * 10 * b * 10) / 100
}

module.exports = { round, SafeDec }
