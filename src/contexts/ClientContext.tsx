import { IbcExtension, QueryClient, setupIbcExtension } from "@cosmjs/stargate";
import { Client as TendermintClient } from "@cosmjs/tendermint-rpc";
import React, { useEffect } from "react";

import { config } from "../config";

export type IbcClient = QueryClient & IbcExtension;

export interface ClientContextType {
  readonly getClient: () => IbcClient;
}

const defaultClientContext: ClientContextType = {
  getClient: (): IbcClient => {
    throw new Error("not yet initialized");
  },
};

const ClientContext = React.createContext<ClientContextType>(defaultClientContext);

export const useClient = (): ClientContextType => React.useContext(ClientContext);

export function ClientProvider({ children }: React.HTMLAttributes<HTMLOrSVGElement>): JSX.Element {
  const [tmClient, setTmClient] = React.useState<TendermintClient>();
  const [ibcClient, setIbcClient] = React.useState<IbcClient>();
  const [value, setValue] = React.useState<ClientContextType>(defaultClientContext);
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    (async function updateTmClient() {
      const tmClient = await TendermintClient.connect(config.rpcUrl);
      setTmClient(tmClient);
    })();
  }, []);

  useEffect(() => {
    if (!tmClient) return;

    (async function updateIbcClient() {
      const ibcClient = QueryClient.withExtensions(tmClient, setupIbcExtension);
      setIbcClient(ibcClient);
    })();
  }, [tmClient]);

  useEffect(() => {
    if (!tmClient || !ibcClient) return;

    setValue({ getClient: () => ibcClient });
    setLoaded(true);
  }, [ibcClient, tmClient]);

  return loaded ? <ClientContext.Provider value={value}>{children}</ClientContext.Provider> : <></>;
}
