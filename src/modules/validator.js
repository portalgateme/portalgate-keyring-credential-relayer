const { isAddress } = require('web3-utils')
const { isTradingWalletWhitelisted } = require('../utils')

const Ajv = require('ajv')
const ajv = new Ajv({ format: 'fast' })

ajv.addKeyword('isAddress', {
  validate: (schema, data) => {
    try {
      return isAddress(data)
    } catch (e) {
      return false
    }
  },
  errors: true,
})

ajv.addKeyword('isTradingWalletWhitelisted', {
  validate: (schema, data) => {
    try {
      return isTradingWalletWhitelisted(data)
    } catch (e) {
      return false
    }
  },
  errors: true,
})

const addressType = { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$', isAddress: true }
const whitelistAddressType = { ...addressType, isTradingWalletWhitelisted: true }
const signatureType = { type: 'string', pattern: '^0x[a-fA-F0-9]{100,200}$' }
const dataType = { type: 'string', pattern: '^0x[a-fA-F0-9]{2000,2100}$' }
const numberType = { type: "number" }

const zkCredentialUpdateSchema = {
  type: 'object',
  properties: {
    req: {
      type: 'array',
      maxItems: 6,
      minItems: 6,
      items: [whitelistAddressType, addressType, numberType, numberType, numberType, dataType],
    },
    signature: signatureType,
  },
  required: ['req', 'signature'],
}

const validateZkCredentialUpdate = ajv.compile(zkCredentialUpdateSchema)
// const validateMiningReward = ajv.compile(miningRewardSchema)
// const validateMiningWithdraw = ajv.compile(miningWithdrawSchema)

function getInputError(validator, data) {
  validator(data)
  if (validator.errors) {
    const error = validator.errors[0]
    return `${error.dataPath} ${error.message}`
  }
  return null
}

function getZkCredentialUpdateError(data) {
  return getInputError(validateZkCredentialUpdate, data)
}

module.exports = {
  getZkCredentialUpdateError
}
