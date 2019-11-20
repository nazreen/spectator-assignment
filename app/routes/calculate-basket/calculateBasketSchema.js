const Joi = require('@hapi/joi')
const customJoi = Joi.extend(joi => ({
  base: joi.array(),
  type: 'stringArray',
  coerce: (value, state, options) => {
    if (value.split && value.length > 0) return { value: value.split(',') }
    else {
      return { value }
    }
  }
}))

const schema = Joi.object({
  items: customJoi
    .stringArray()
    .min(1)
    .items(
      Joi.string()
        .only()
        .allow('Apples', 'Milk', 'Soup', 'Bread')
    )
    .prefs({ convert: true })
    .required(), // TODO allow only whitelisted
  currency: Joi.string()
    .only()
    .allow('GBP', 'USD', 'EUR')
    .required()
})

module.exports = schema
