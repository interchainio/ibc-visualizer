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

const networks: NetworkConfigs = {
  ["coralnet"]: coralnet,
};

export const config = process.env.REACT_APP_NETWORK ? networks[process.env.REACT_APP_NETWORK] : local;
