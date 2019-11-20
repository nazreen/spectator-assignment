const SafeDec = {
  subtract: (a, b) => (a * 10 - b * 10) / 10,
  multiply: (a, b) => (a * 10 * b * 10) / 100
}

module.exports = { SafeDec }
