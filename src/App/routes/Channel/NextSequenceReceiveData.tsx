import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcNextSequenceReceiveResponse } from "../../../types/ibc";

interface NextSequenceReceiveDataProps {
  readonly portId: string;
  readonly channelId: string;
}

export function NextSequenceReceiveData({ portId, channelId }: NextSequenceReceiveDataProps): JSX.Element {
  const { getClient } = useClient();
  const [nextSequenceReceiveResponse, setNextSequenceReceiveResponse] = useState(
    new IbcNextSequenceReceiveResponse(),
  );

  useEffect(() => {
    (async function updateNextSequenceReceiveResponse() {
      const nextSequenceReceiveResponse = await getClient().ibc.unverified.nextSequenceReceive(
        portId,
        channelId,
      );
      setNextSequenceReceiveResponse(new IbcNextSequenceReceiveResponse(nextSequenceReceiveResponse));
    })();
  }, [getClient, portId, channelId]);

  return nextSequenceReceiveResponse ? (
    <div className="flex flex-col m-2 ml-0">
      <span>
        Next sequence receive proof:{" "}
        {nextSequenceReceiveResponse.proof.length ? `[${nextSequenceReceiveResponse.proof.toString()}]` : "–"}
      </span>
      <span>
        Next sequence receive:{" "}
        {nextSequenceReceiveResponse.nextSequenceReceive
          ? nextSequenceReceiveResponse.nextSequenceReceive.toString(10)
          : "–"}
      </span>
    </div>
  ) : (
    <span className="font-bold">No next sequence receive found</span>
  );
}
