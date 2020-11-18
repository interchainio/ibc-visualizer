import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { pathChannels } from "../../paths";

interface SelectConnectionIdProps {
  readonly connectionId: string;
}

export function SelectConnectionId({ connectionId }: SelectConnectionIdProps): JSX.Element {
  const history = useHistory();
  const { getClient } = useClient();

  const [connectionIds, setConnectionIds] = useState<string[]>([]);

  useEffect(() => {
    (async function updateConnectionIds() {
      const connectionsResponse = await getClient().ibc.unverified.connections();
      const connectionIds =
        connectionsResponse.connections
          ?.map((connection) => connection.id ?? "")
          .filter((connectionId) => connectionId !== "") ?? [];

      setConnectionIds(connectionIds);
    })();
  }, [getClient]);

  function handleConnectionIdSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
    history.push(`${pathChannels}/${event.target.value}`);
  }

  return (
    <div>
      <span className="font-bold">Connection ID:</span>
      <select value={connectionId} onChange={handleConnectionIdSelect} className="ml-2 text-black">
        <option value="">All</option>
        {connectionIds.map((connectionId) => (
          <option value={connectionId} key={connectionId}>
            {connectionId}
          </option>
        ))}
      </select>
    </div>
  );
}
