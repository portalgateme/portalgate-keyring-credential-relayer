const trustedForwarderABI = require('../abis/trustedForwarder.json')

const { queue } = require('./queue')
const { ethers } = require('ethers')
const {
  RelayerError,
  logRelayerError,
} = require('./utils')
const { jobType, status } = require('./constants')
const {
  gasLimit,
  privateKey,
  httpRpcUrl,
  baseFeeReserve,
  trustedForwarderAddress,
} = require('./config')
const { TxManager } = require('tx-manager')
const { redis } = require('./modules/redis')
const getProvider = require('./modules/provider')

let provider
let currentTx
let currentJob
let txManager

async function start() {
  try {
    await clearErrors()
    provider = getProvider()
    const { CONFIRMATIONS, MAX_GAS_PRICE } = process.env
    txManager = new TxManager({
      privateKey,
      rpcUrl: httpRpcUrl,
      config: {
        CONFIRMATIONS,
        MAX_GAS_PRICE,
        THROW_ON_REVERT: false,
        BASE_FEE_RESERVE_PERCENTAGE: baseFeeReserve,
      },
    })
    queue.process(processJob)
    console.log('Worker started')
  } catch (e) {
    await logRelayerError(redis, e)
    console.error('error on start worker', e.message)
  }
}

async function getTxObject({ data }) {
  if (data.type === jobType.ZK_CREDENTIAL_UPDATE) {
    const trustedForwarderInterface = new ethers.utils.Interface(trustedForwarderABI)
    const encodeFunctionData = trustedForwarderInterface.encodeFunctionData(
      'execute',
      [data.req, data.signature],
    )

    return {
      to: trustedForwarderAddress,
      data: encodeFunctionData,
      gasLimit,
    }
  }
}

async function processJob(job) {
  try {
    if (!jobType[job.data.type]) {
      throw new RelayerError(`Unknown job type: ${job.data.type}`)
    }
    currentJob = job
    await updateStatus(status.ACCEPTED)
    console.log(`Start processing a new ${job.data.type} job #${job.id}`)
    await submitTx(job)
  } catch (e) {
    console.error('processJob', e.message)
    await updateStatus(status.FAILED)
    throw new RelayerError(e.message)
  }
}

async function submitTx(job, retry = 0) {
  currentTx = await txManager.createTx(await getTxObject(job))

  try {
    const receipt = await currentTx
      .send()
      .on('transactionHash', txHash => {
        updateTxHash(txHash)
        updateStatus(status.SENT)
      })
      .on('mined', receipt => {
        console.log('Mined in block', receipt.blockNumber)
        updateStatus(status.MINED)
      })
      .on('confirmations', updateConfirmations)

    if (receipt.status === 1) {
      await updateStatus(status.CONFIRMED)
    }
  } catch (e) {
    throw new RelayerError(`Revert by smart contract ${e.message}`)
  }
}

async function updateTxHash(txHash) {
  console.log(`A new successfully sent tx ${txHash}`)
  currentJob.data.txHash = txHash
  await currentJob.update(currentJob.data)
}

async function updateConfirmations(confirmations) {
  console.log(`Confirmations count ${confirmations}`)
  currentJob.data.confirmations = confirmations
  await currentJob.update(currentJob.data)
}

async function updateStatus(status) {
  console.log(`Job status updated ${status}`)
  currentJob.data.status = status
  await currentJob.update(currentJob.data)
}

async function clearErrors() {
  console.log('Errors list cleared')
  await redis.del('errors')
}

start()
