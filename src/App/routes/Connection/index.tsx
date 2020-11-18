import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcConnectionResponse } from "../../../types/ibc";
import { printIbcConnectionState } from "../../../utils/ibc";
import { CounterpartyData } from "../../components/CounterpartyData";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { style } from "../../style";

interface ConnectionParams {
  readonly connectionId: string;
}

export function Connection(): JSX.Element {
  const { connectionId } = useParams<ConnectionParams>();
  const { getClient } = useClient();

  const [connectionResponse, setConnectionResponse] = useState(new IbcConnectionResponse());

  useEffect(() => {
    (async function updateConnectionResponse() {
      const connectionResponse = await getClient().ibc.unverified.connection(connectionId);
      setConnectionResponse(new IbcConnectionResponse(connectionResponse));
    })();
  }, [getClient, connectionId]);

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <span className={style.title}>Connection</span>
      {connectionId ? <span>Connection ID: {connectionId}</span> : null}
      {connectionResponse ? (
        <>
          <span>Proof: {connectionResponse.proof.length ? toHex(connectionResponse.proof) : "–"}</span>
          <HeightData height={connectionResponse.proofHeight} />
          {connectionResponse.connection ? (
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
          ) : (
            <span className={style.subtitle}>No connection found</span>
          )}
        </>
      ) : null}
    </div>
  );
}
