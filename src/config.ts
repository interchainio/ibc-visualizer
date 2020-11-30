interface AppConfig {
  readonly rpcUrl: string;
}
interface NetworkConfigs {
  readonly [key: string]: AppConfig;
}

// Configuration for CosmJS development chain simapp.
// See https://github.com/cosmos/cosmjs/tree/master/scripts/simapp.
const local: AppConfig = {
  rpcUrl: "http://localhost:26658",
};

const musselnet: AppConfig = {
  rpcUrl: "https://rpc.musselnet.cosmwasm.com",
};

const configs: NetworkConfigs = { local, musselnet };

function getAppConfig(): AppConfig {
  const network = process.env.REACT_APP_NETWORK;
  if (!network) return local;

  const config = configs[network];
  if (!config) {
    throw new Error(`No configuration found for network ${network}`);
  }

  return config;
}

export const config = getAppConfig();
