interface AppConfig {
  readonly rpcUrl: string;
}

const local: AppConfig = {
  rpcUrl: "http://localhost:26658",
};

const coralnet: AppConfig = {
  rpcUrl: "https://rpc.coralnet.cosmwasm.com",
};

// REACT_APP_LOCAL is set via `yarn start:local`
const isLocal = process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_LOCAL;

export const config = isLocal ? local : coralnet;
