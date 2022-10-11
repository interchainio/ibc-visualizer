import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcConnectionsResponse } from "../../../types/ibc";
import { compareComponentWise } from "../../../utils/sort";
import { ellideMiddle } from "../../../utils/strings";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { pathConnections } from "../../paths";
import { style } from "../../style";

export function Connections(): JSX.Element {
  const { getClient } = useClient();

  const [clientIds, setClientIds] = useState<string[]>([]);
  const [connectionsResponse, setConnectionsResponse] = useState<IbcConnectionsResponse>();

  useEffect(() => {
    (async function updateConnectionsResponse() {
      const connectionsResponse = await getClient().ibc.connection.connections();
      setConnectionsResponse(connectionsResponse);

      const nonEmptyClientIds =
        connectionsResponse.connections
          ?.map((connection) => connection.clientId ?? "")
          .filter((clientId) => clientId !== "") ?? [];

      const nonDuplicateClientIds = [...new Set(nonEmptyClientIds)];
      const orderedClientIds = nonDuplicateClientIds.sort(compareComponentWise);

      setClientIds(orderedClientIds);
    })();
  }, [getClient]);

  async function loadMoreConnections(): Promise<void> {
    if (!connectionsResponse?.pagination?.nextKey?.length) return;

    const newConnectionsResponse = await getClient().ibc.connection.connections(
      connectionsResponse.pagination.nextKey,
    );

    const oldConnections = connectionsResponse.connections ?? [];
    const newConnections = newConnectionsResponse.connections ?? [];

    setConnectionsResponse({
      ...newConnectionsResponse,
      connections: [...oldConnections, ...newConnections],
    });

    const newClientIds =
      newConnectionsResponse.connections
        ?.map((connection) => connection.clientId ?? "")
        .filter((clientId) => clientId !== "") ?? [];

    setClientIds((oldClientIds) => {
      // New paginated connections may be from same client as the old ones,
      // must remove duplicate client ids
      const mergedClientIds = [...oldClientIds, ...newClientIds];
      const uniqueClientIds = [...new Set(mergedClientIds)];
      const sortedClientIds = uniqueClientIds.sort(compareComponentWise);

      return sortedClientIds;
    });
  }

  return (
    <div className="container mx-auto">
      <Navigation />
      <div>
        {connectionsResponse ? (
          <>
            <HeightData height={connectionsResponse.height} />
            <span className={style.title}>Connections</span>
            {connectionsResponse.connections?.length ? (
              <>
                <div>
                  {clientIds.map((clientId) => (
                    <div key={clientId} className="flex flex-col items-start">
                      <div>
                        <strong>Client {clientId}</strong>
                      </div>
                      <ol>
                        {connectionsResponse.connections
                          ?.filter((connection) => connection.clientId === clientId)
                          .sort((a, b) => {
                            // orders strings like "connection-6" numerically
                            const numberA = Number.parseInt(a.id?.split("-")[1] || "", 10);
                            const numberB = Number.parseInt(b.id?.split("-")[1] || "", 10);

                            return numberA - numberB;
                          })
                          .map((connection) => (
                            <li key={connection.id}>
                              <Link
                                to={`${pathConnections}/${connection.id}`}
                                key={connection.id}
                                className={`${style.link} mt-2 ml-5 block`}
                              >
                                {ellideMiddle(connection.id ?? "–", 20)}
                              </Link>
                            </li>
                          ))}
                      </ol>
                    </div>
                  ))}
                </div>
                {connectionsResponse.pagination?.nextKey?.length ? (
                  <button onClick={loadMoreConnections}>Load more</button>
                ) : null}
              </>
            ) : (
              <span>No connections found</span>
            )}
          </>
        ) : (
          <span>Loading data …</span>
        )}
      </div>
    </div>
  );
}
