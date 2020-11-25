import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcUnreceivedPacketsResponse } from "../../../types/ibc";
import { style } from "../../style";

interface UnreceivedPacketsListProps {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: number;
}

export function UnreceivedPacketsList({
  portId,
  channelId,
  sequence,
}: UnreceivedPacketsListProps): JSX.Element {
  const { getClient } = useClient();
  const [unreceivedPacketsResponse, setUnreceivedPacketsResponse] = useState<IbcUnreceivedPacketsResponse>();

  useEffect(() => {
    (async function updateUnreceivedPacketsResponse() {
      const unreceivedPacketsResponse = await getClient().ibc.unverified.unreceivedPackets(
        portId,
        channelId,
        [sequence],
      );
      setUnreceivedPacketsResponse(unreceivedPacketsResponse);
    })();
  }, [getClient, portId, channelId, sequence]);

  return unreceivedPacketsResponse?.sequences?.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Unreceived packets</span>
      <div className="flex flex-row flex-wrap">
        {unreceivedPacketsResponse.sequences.map((sequence, index) => (
          <span key={index} className={style.listItemStyle}>
            Sequence: {sequence.toString(10)}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No unreceived packets for sequence {sequence}</div>
  );
}
