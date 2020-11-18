import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcUnreceivedAcksResponse } from "../../../types/ibc";
import { style } from "../../style";

interface UnreceivedAcksListProps {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: number;
}

export function UnreceivedAcksList({ portId, channelId, sequence }: UnreceivedAcksListProps): JSX.Element {
  const { getClient } = useClient();
  const [unreceivedAcksResponse, setUnreceivedAcksResponse] = useState(new IbcUnreceivedAcksResponse());

  useEffect(() => {
    (async function updateUnreceivedAcksResponse() {
      const unreceivedAcksResponse = await getClient().ibc.unverified.unreceivedAcks(portId, channelId, [
        sequence,
      ]);
      setUnreceivedAcksResponse(new IbcUnreceivedAcksResponse(unreceivedAcksResponse));
    })();
  }, [getClient, portId, channelId, sequence]);

  return unreceivedAcksResponse.sequences.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Unreceived acknowledgements</span>
      <div className="flex flex-row flex-wrap">
        {unreceivedAcksResponse.sequences.map((sequence, index) => (
          <span key={index} className={style.listItemStyle}>
            Sequence: {sequence.toString(10)}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No unreceived acknowledgements for sequence {sequence}</div>
  );
}
