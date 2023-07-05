require('dotenv').config()

const { jobType } = require('./constants')
const { whitelistAddresses } = require('./config/whitelistAddress')
const netId = Number(process.env.NET_ID) || 1

const updateCredentialAddress = {
  netId1: "",
  netId5: "0x1F49bD7072a0C64D3D2906808d1dd3945F26ED7e",
}

module.exports = {
  netId,
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  networkName: process.env.NETWORK_NAME || '',
  alchemyPrivateKey: process.env.ALCHEMY_PRIVATE_KEY || '',
  httpRpcUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_PRIVATE_KEY}`,
  trustedForwarderAddress: process.env.TRUSTED_FORWARDER,
  privateKey: process.env.PRIVATE_KEY,
  port: process.env.APP_PORT || 8000,
  gasLimits: {
    [jobType.ZK_CREDENTIAL_UPDATE]: 1000000,
  },
  minimumBalance: '500000000000000000',
  baseFeeReserve: Number(process.env.BASE_FEE_RESERVE_PERCENTAGE),
  whitelistAddresses: whitelistAddresses[`netId${netId}`],
  updateCredentialAddress: updateCredentialAddress[`netId${netId}`]
}
