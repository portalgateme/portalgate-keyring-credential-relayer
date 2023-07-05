const { whitelistAddresses, updateCredentialAddress } = require('./config')
const { toBN, toChecksumAddress, BN, fromWei, isAddress, toWei } = require('web3-utils')

const isTradingWalletWhitelisted = (address) => {
  return whitelistAddresses.includes(address)
}

const isKnownUpdateCredential = (address) => {
  return toChecksumAddress(address) === toChecksumAddress(updateCredentialAddress)
}

function setSafeInterval(func, interval) {
  func()
    .catch(console.error)
    .finally(() => {
      setTimeout(() => setSafeInterval(func, interval), interval)
    })
}

class RelayerError extends Error {
  constructor(message, score = 0) {
    super(message)
    this.score = score
  }
}

const logRelayerError = async (redis, e) => {
  await redis.zadd('errors', 'INCR', e.score || 1, e.message)
}

const readRelayerErrors = async redis => {
  const set = await redis.zrevrange('errors', 0, -1, 'WITHSCORES')
  const errors = []
  while (set.length) {
    const [message, score] = set.splice(0, 2)
    errors.push({ message, score })
  }
  return errors
}

module.exports = {
  setSafeInterval,
  toBN,
  toChecksumAddress,
  fromWei,
  toWei,
  isAddress,
  RelayerError,
  logRelayerError,
  readRelayerErrors,
  isTradingWalletWhitelisted,
  isKnownUpdateCredential
}
