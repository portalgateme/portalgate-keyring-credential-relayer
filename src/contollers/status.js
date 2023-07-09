const queue = require('../queue')
const { netId, trustedForwarderAddress, networkName } = require('../config')
const { version } = require('../../package.json')
const { redis } = require('../modules/redis')
const { readRelayerErrors, isTradingWalletWhitelisted } = require('../utils')

async function status(req, res) {
  const health = await redis.hgetall('health')
  health.errorsLog = await readRelayerErrors(redis)
  const { waiting: currentQueue } = await queue.queue.getJobCounts()

  res.json({
    netId,
    networkName,
    version,
    health,
    trustedForwarderAddress,
    currentQueue
  })
}

function index(req, res) {
  res.send(
    'This is <a href=https://portalgate.me>Portal Gate</a> Relayer service. Check the <a href=/status>/status</a> for settings',
  )
}

async function getJob(req, res) {
  const status = await queue.getJobStatus(req.params.id)
  return status ? res.json(status) : res.status(400).json({ error: "The job doesn't exist" })
}

function checkWalletAddress(req, res) {
  const address = req.params.address
  const isAddressWhitelisted = isTradingWalletWhitelisted(address)
  return res.json(isAddressWhitelisted)
}

module.exports = {
  status,
  index,
  getJob,
  checkWalletAddress
}
