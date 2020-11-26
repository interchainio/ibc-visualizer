import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcConnectionResponse } from "../../../types/ibc";
import { printIbcConnectionState } from "../../../utils/ibc";
import { CounterpartyData } from "../../components/CounterpartyData";
import { HeightData } from "../../components/HeightData";
import { style } from "../../style";

interface ConnectionDataProps {
  readonly connectionId: string;
}

export function ConnectionData({ connectionId }: ConnectionDataProps): JSX.Element {
  const { getClient } = useClient();
  const [connectionResponse, setConnectionResponse] = useState<IbcConnectionResponse>();

  useEffect(() => {
    (async function updateConnectionResponse() {
      const connectionResponse = await getClient().ibc.unverified.connection(connectionId);
      setConnectionResponse(connectionResponse);
    })();
  }, [getClient, connectionId]);

  return connectionResponse?.connection ? (
    <div>
      <span className={style.title}>Connection</span>
      {connectionId ? <span>Connection ID: {connectionId}</span> : null}
      <span>Proof: {connectionResponse.proof?.length ? toHex(connectionResponse.proof) : "–"}</span>
      <HeightData height={connectionResponse.proofHeight} />
      <div className="flex flex-col">
        <span>Client ID: {connectionResponse.connection.clientId ?? "–"}</span>
        <span>
          State:{" "}
          {connectionResponse.connection.state
            ? printIbcConnectionState(connectionResponse.connection.state)
            : "–"}
        </span>
        {connectionResponse.connection.versions?.length ? (
          <div>
            <span className={style.subtitle}>Versions</span>
            {connectionResponse.connection.versions.map((version, index) => (
              <div key={index} className="flex flex-col">
                <span>ID: {version.identifier ?? "–"}</span>
                <span>Features: {version.features ? version.features.join(", ") : "–"}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className={style.subtitle}>No versions found</span>
        )}
        <CounterpartyData counterparty={connectionResponse.connection.counterparty} />
      </div>
    </div>
  ) : (
    <span className={style.subtitle}>No connection found</span>
  );
}
