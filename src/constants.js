const jobType = Object.freeze({
  ZK_CREDENTIAL_UPDATE: 'ZK_CREDENTIAL_UPDATE'
})

const status = Object.freeze({
  QUEUED: 'QUEUED',
  ACCEPTED: 'ACCEPTED',
  SENT: 'SENT',
  MINED: 'MINED',
  RESUBMITTED: 'RESUBMITTED',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
})

module.exports = {
  jobType,
  status,
}
