const Joi = require('@hapi/joi')

const schema = Joi.object({
  items: Joi.array().required(), // TODO allow only whitelisted
  currency: Joi.string().allow('GBP', 'USD', 'EUR')
})

module.exports = schema
