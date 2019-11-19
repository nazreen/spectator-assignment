const Joi = require('@hapi/joi')

const schema = Joi.object({
  items: Joi.alternatives()
    .try(Joi.string(), Joi.array())
    .required(), // TODO allow only whitelisted
  currency: Joi.string()
    .allow('GBP', 'USD', 'EUR')
    .required()
})

module.exports = schema
