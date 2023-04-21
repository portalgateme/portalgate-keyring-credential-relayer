require('chai').should()

const resolver = require('../src/modules/resolver')
const pgtConfig = require('../src/config/portalgateConfig')

const contractAddress = {
  pgt: "0xbe690bE6781188c8305D596c22D4d6b8DdED40D7",
  pgtRouter: "0x361F697a7d3AD9299a5FfcE7d8a3C81059dc98f3"
}

describe("Resolve ens address", () => {
  it('should be pgt address', async () => {
    const address = await resolver.resolve(pgtConfig.pgt.address)
    address.should.equal(contractAddress.pgt)
  })

  it('should be pgt router address', async () => {
    const address = await resolver.resolve(pgtConfig.pgtRouter.address)
    address.should.equal(contractAddress.pgtRouter)
  })
})


