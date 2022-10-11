interface AppConfig {
  readonly rpcUrl: string;
}

interface NetworkConfigs {
  readonly [key: string]: AppConfig;
}

const configs: NetworkConfigs = {
  // Configuration for CosmJS development chain simapp.
  // See https://github.com/cosmos/cosmjs/tree/master/scripts/simapp.
  local: {
    rpcUrl: "http://localhost:26658",
  },
  "nois-testnet-003": {
    rpcUrl: "https://nois.rpc.bccnodes.com/",
  },
};

function getAppConfig(): AppConfig {
  const network = process.env.REACT_APP_NETWORK;
  if (!network) {
    throw new Error("Please set REACT_APP_NETWORK");
  }

  const config = configs[network];
  if (!config) {
    throw new Error(`No configuration found for network ${network}. See src/config.ts.`);
  }

  return config;
}

export const config = getAppConfig();
