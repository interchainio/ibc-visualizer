interface AppConfig {
  readonly rpcUrl: string;
}
interface NetworkConfigs {
  readonly [key: string]: AppConfig;
}

const local: AppConfig = {
  rpcUrl: "http://localhost:26658",
};

const coralnet: AppConfig = {
  rpcUrl: "https://rpc.coralnet.cosmwasm.com",
};

const configs: NetworkConfigs = {
  ["local"]: local,
  ["coralnet"]: coralnet,
};

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
