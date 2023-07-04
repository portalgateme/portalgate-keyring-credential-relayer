const {
  getZkCredentialUpdateError,
} = require('../modules/validator')
const { postJob } = require('../queue')
const { jobType } = require('../constants')

async function updateZkCredential(req, res) {
  const inputError = getZkCredentialUpdateError(req.body)
  if (inputError) {
    console.log('Invalid input:', inputError)
    return res.status(400).json({ error: inputError })
  }
  const id = await postJob({
    type: jobType.ZK_CREDENTIAL_UPDATE,
    request: req.body,
  })
  return res.json({ id })
}

module.exports = {
  updateZkCredential,
}
