import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcConnectionsResponse } from "../../../types/ibc";
import { ellideMiddle } from "../../../utils/strings";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { pathConnections } from "../../paths";
import { style } from "../../style";

// orders strings like "07-tendermint-0" numerically
function compareClientIds(a: string, b: string): number {
  const arrayA = a.split("-");
  const arrayB = b.split("-");
  arrayA.splice(1, 1);
  arrayB.splice(1, 1);
  const [firstNumberA, secondNumberA] = arrayA.map((stringNum) => Number.parseInt(stringNum, 10));
  const [firstNumberB, secondNumberB] = arrayB.map((stringNum) => Number.parseInt(stringNum, 10));

  if (firstNumberA > firstNumberB) return firstNumberA - firstNumberB;
  return secondNumberA - secondNumberB;
}

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
      const orderedClientIds = nonDuplicateClientIds.sort(compareClientIds);

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
      const sortedClientIds = uniqueClientIds.sort(compareClientIds);

      return sortedClientIds;
    });
  }

  return (
    <div className="container mx-auto">
      <Navigation />
      <div>
        {connectionsResponse ? (
          <>
            <span className={style.title}>Connections / client</span>
            <HeightData height={connectionsResponse.height} />
            {connectionsResponse.connections?.length ? (
              <>
                <div>
                  {clientIds.map((clientId) => (
                    <div key={clientId} className="flex flex-col items-start">
                      <div className={style.subtitle}>Client {clientId}</div>
                      {connectionsResponse.connections
                        ?.filter((connection) => connection.clientId === clientId)
                        .sort((a, b) => {
                          // orders strings like "connection-6" numerically
                          const numberA = Number.parseInt(a.id?.split("-")[1] || "", 10);
                          const numberB = Number.parseInt(b.id?.split("-")[1] || "", 10);

                          return numberA - numberB;
                        })
                        .map((connection) => (
                          <Link
                            to={`${pathConnections}/${connection.id}`}
                            key={connection.id}
                            className={`${style.link} mt-2 block`}
                          >
                            Connection {ellideMiddle(connection.id ?? "–", 20)}
                          </Link>
                        ))}
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
