const { setSafeInterval, toBN, fromWei, RelayerError } = require('./utils')
const { privateKey, minimumBalance } = require('./config')
const { redis } = require('./modules/redis')
const { ethers } = require('ethers')
const getProvider = require('./modules/provider')

const provider = getProvider()

async function main() {
  try {
    const account = new ethers.Wallet(privateKey, provider);
    const balance = await account.getBalance()
    if (toBN(balance.toString()).lt(toBN(minimumBalance))) {
      throw new RelayerError(`Not enough balance, less than ${fromWei(minimumBalance)} ETH`, 1)
    }

    await redis.hset('health', { status: true, error: '' })
  } catch (e) {
    console.error('healthWatcher', e.message)
    await redis.hset('health', { status: false, error: e.message })
  }
}

setSafeInterval(main, 30 * 1000)
