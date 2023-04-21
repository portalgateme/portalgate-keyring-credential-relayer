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
          '0.1': '0xe636207E74109FF9848f45D61183B9946Bc063f7',
          '1': '0xF0D74602cCf61a9A49406C25601E8F36DF5246ac',
          '10': '0x00D76fEd7a758ae5Fc7A6E67AE64008AD40234aA',
          '100': '0x1546F8D96d136D34970E461cCE3cb26163b43B8f',
        },
        tokenAddress: "0x8EC8e075Baadc256A9223aE08c634B453b6875D7",
        symbol: 'kycETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          '100': '0xdbb59742C95Ca2e85A5dA7E44Bb838fb1f77b754',
          '1000': '0x03b26dC77949a34406e45085C33Fc4F10C650AC5',
          '10000': '0x8947fF6c223C4af6593a0A320564ac3aE3f09D5d',
          '100000': '0x5e1d9C59577602ad95C85b72d4D4E8ab490CeD39',
        },
        tokenAddress: "0x0903BDD547388b85bAe2b025D2f354877912D63C",
        symbol: 'kycDAI',
        decimals: 18,
      },
      usdc: {
        instanceAddress: {
          '100': '0x1a72faBA1ec2dC20c0b213C49B91B1361A518991',
          '1000': '0x0e4Da0cf4dd7a3Cb7aA6Bc9882C6C3A7cEeb35d7',
          '10000': '0xFe0E3b852373eF97De646e401aD1e054c54aE67f',
          '100000': '0xd7E5D0bE4e95F2d3dC10A9b9A7968F39198F7b2a',
        },
        tokenAddress: "0x2a0b478Ed8CDF9243b0D1cC1A460869AD67714F2",
        decimals: 18,
        symbol: 'kycUSDC',
      },
      usdt: {
        instanceAddress: {
          '100': '0xddcFC3409791c3536bE7C7AA5a7A77af1bECF238',
          '1000': '0x1E4D6e7763F688A772b683b46c47E8253ed1336D',
          '10000': '0xf1191F4b29872781a3a8692319095125F2ba05E7',
          '100000': '0xd43826F15249F1E3Ec855304764E13d59c860a44',
        },
        symbol: 'kycUSDT',
        tokenAddress: '0xFd4C33412E4E4A332BC4B3CaCaAF1D4F1Cf3eF68',
        decimals: 18
      },
    },
  }
}
