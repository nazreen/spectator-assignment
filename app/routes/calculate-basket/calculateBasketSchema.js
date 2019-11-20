const Joi = require('@hapi/joi')
const customJoi = Joi.extend(joi => ({
  base: joi.array(),
  type: 'stringArray',
  coerce: (value, state, options) => {
    if (value.split) return { value: value.split(',') }
    else {
      return { value }
    }
  }
}))

const schema = Joi.object({
  items: customJoi
    .stringArray()
    .prefs({ convert: true })
    .required(), // TODO allow only whitelisted
  currency: Joi.string()
    .allow('GBP', 'USD', 'EUR')
    .required()
})

module.exports = schema
