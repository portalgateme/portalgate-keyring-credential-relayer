const { toWei } = require('web3-utils')

module.exports = {
  pgt: {
    address: "pgt.contract.portalgate.eth",
    cap: toWei('1000000')
  },
  governance: {
    address: "governance.contract.portalgate.eth"
  },
  governanceImpl: {
    address: "governance-impl.contract.portalgate.eth"
  },
  feeManager: {
    address: "fee-manager.contract.portalgate.eth"
  },
  instanceRegistry: {
    address: 'instance-registry.contract.portalgate.eth'
  },
  pgtRouter: {
    address: "pgt-router.contract.portalgate.eth"
  },
  pgtStakingRewards: {
    address: "staking-rewards.contract.portalgate.eth"
  },
  relayerRegistry: {
    address: "relayer-registry.contract.portalgate.eth"
  },
  instances: {
    netId1: {
      eth: {
        instanceAddress: {
          0.1: '',
          1: '',
          10: '',
          100: '',
        },
        symbol: 'ETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          100: '',
          1000: '',
          10000: '',
          100000: '',
        },
        tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        symbol: 'DAI',
        decimals: 18,
      },
      usdc: {
        instanceAddress: {
          100: '',
          1000: '',
          10000: '',
          100000: '',
        },
        tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        decimals: 6,
      },
      usdt: {
        instanceAddress: {
          100: '',
          1000: '',
          10000: '',
          100000: '',
        },
        tokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT',
        decimals: 6,
      }
    },
    netId5: {
      eth: {
        instanceAddress: {
          '0.1': '0x1f5c4316aED284F8348a2663BAef4EE35b308E51',
          '1': '0x',
          '10': '0x',
          '100': '0x',
        },
        tokenAddress: "0x5DEFB82285503d613D5Bf191B28B6d59EA67142f",
        symbol: 'kycETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          '100': '0x',
          '1000': '0x',
          '10000': '0x',
          '100000': '0x',
        },
        tokenAddress: "0x573396bE685b6eAa45dAE6cAaC8F041fE4C1ab68",
        symbol: 'kycDAI',
        decimals: 18,
      },
      usdc: {
        instanceAddress: {
          '100': '0x',
          '1000': '0x',
          '10000': '0x',
          '100000': '0x',
        },
        tokenAddress: "0xaF21bf4CaD882a01ee94399932d359EDA4f2b960",
        decimals: 6,
        symbol: 'kycUSDC',
      },
      usdt: {
        instanceAddress: {
          '100': '0x33e5D8D1167AAf513c483da5B1A61dD81b2b9f2c',
          '1000': '0x',
          '10000': '0x',
          '100000': '0x',
        },
        symbol: 'kycUSDT',
        tokenAddress: '0x5fD43956c4c75459C12282F30465C70D29338613',
        decimals: 6
      },
    },
  }
}
