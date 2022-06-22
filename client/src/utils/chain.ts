export interface IChain {
  name: string;
  short_name: string;
  nativeCurrency: string;
  network: string;
  network_id: number;
  chain_id: string;
  providers: string[];
  rpc_url: string;
  abi_api_url: string;
  tokenlist_api_url: string;
  dai_contract: string;
  wrapper_contract: string;
  block_explorer: string;
}

interface ISupportedChains {
  [key: string]: IChain;
}

export const supportedChains: ISupportedChains = {
  '0x1': {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    nativeCurrency: 'ETH',
    network: 'mainnet',
    network_id: 1,
    chain_id: '0x1',
    providers: ['walletconnect'],
    // , 'portis', 'fortmatic'
    rpc_url: `https://${process.env.REACT_APP_RPC_URI}.eth.rpc.rivet.cloud/`,
    abi_api_url:
      'https://api.etherscan.io/api?module=contract&action=getabi&address=',
    tokenlist_api_url: 'https://api.etherscan.io/api',
    dai_contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
    wrapper_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    block_explorer: 'https://etherscan.io',
  },
};

export const chainByID = (chainID: string) => supportedChains[chainID];

export const chainByNetworkId = (networkId: number) => {
  const idMapping: { [key: number]: IChain } = {
    1: supportedChains['0x1'],
  };

  return idMapping[networkId];
};