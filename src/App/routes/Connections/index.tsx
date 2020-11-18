import { ibc } from "@cosmjs/stargate/types/codec";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcConnectionsResponse } from "../../../types/ibc";
import { ellideMiddle } from "../../../utils/strings";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { pathConnection } from "../../paths";
import { style } from "../../style";
import { SelectClientId } from "./SelectClientId";

interface ConnectionsParams {
  readonly clientId: string;
}

export function Connections(): JSX.Element {
  const { clientId } = useParams<ConnectionsParams>();
  const { getClient } = useClient();

  const [connectionsResponse, setConnectionsResponse] = useState(new IbcConnectionsResponse());

  useEffect(() => {
    (async function updateConnectionsResponse() {
      const connectionsResponse = new IbcConnectionsResponse(await getClient().ibc.unverified.connections());

      if (clientId) {
        try {
          const { connectionPaths } = await getClient().ibc.unverified.clientConnections(clientId);
          const connections = connectionPaths
            ? await Promise.all(
                connectionPaths.map(async (connectionId) => {
                  const responsePromise = await getClient().ibc.unverified.connection(connectionId);
                  const connection: ibc.core.connection.v1.IIdentifiedConnection = responsePromise.connection
                    ? { ...responsePromise, id: connectionId }
                    : { id: connectionId };

                  return connection;
                }),
              )
            : [];

          connectionsResponse.connections = connections;
        } catch {
          connectionsResponse.connections = [];
        }
      }

      setConnectionsResponse(connectionsResponse);
    })();
  }, [getClient, clientId]);

  async function loadMoreConnections(): Promise<void> {
    if (!connectionsResponse.pagination?.nextKey) return;

    const newConnectionsResponse = new IbcConnectionsResponse(
      await getClient().ibc.unverified.connections(connectionsResponse.pagination.nextKey),
    );

    setConnectionsResponse({
      ...newConnectionsResponse,
      connections: [...connectionsResponse.connections, ...newConnectionsResponse.connections],
    });
  }

  return (
    <div className="container mx-auto">
      <Navigation />
      <div>
        <span className={style.title}>Connections</span>
        <SelectClientId clientId={clientId} />
        {connectionsResponse.connections.length ? (
          <>
            <HeightData height={connectionsResponse.height} />
            <div className="flex flex-row flex-wrap">
              {connectionsResponse.connections.map((connection, index) => (
                <Link to={`${pathConnection}/${connection.id}`} key={index} className={style.button}>
                  <span>{ellideMiddle(connection.id ?? "–", 20)}</span>
                </Link>
              ))}
            </div>
            {!clientId && connectionsResponse.pagination?.nextKey?.length ? (
              <button onClick={loadMoreConnections}>Load more</button>
            ) : null}
          </>
        ) : (
          <span>No connections found</span>
        )}
      </div>
    </div>
  );
}
