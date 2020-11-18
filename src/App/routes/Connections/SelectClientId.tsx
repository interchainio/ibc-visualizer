import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { pathConnections } from "../../paths";

interface SelectClientIdProps {
  readonly clientId: string;
}

export function SelectClientId({ clientId }: SelectClientIdProps): JSX.Element {
  const history = useHistory();
  const { getClient } = useClient();

  const [clientIds, setClientIds] = useState<string[]>([]);

  useEffect(() => {
    (async function updateClientIds() {
      const connectionsResponse = await getClient().ibc.unverified.connections();
      const clientIds =
        connectionsResponse.connections
          ?.map((connection) => connection.clientId ?? "")
          .filter((clientId) => clientId !== "") ?? [];

      setClientIds(clientIds);
    })();
  }, [getClient]);

  function handleClientIdSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
    history.push(`${pathConnections}/${event.target.value}`);
  }

  return (
    <div>
      <span className="font-bold">Client ID:</span>
      <select value={clientId} onChange={handleClientIdSelect} className="ml-2 text-black">
        <option value="">All</option>
        {clientIds.map((clientId) => (
          <option value={clientId} key={clientId}>
            {clientId}
          </option>
        ))}
      </select>
    </div>
  );
}
