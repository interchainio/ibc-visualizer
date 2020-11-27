import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketCommitmentsResponse } from "../../../types/ibc";
import { pathChannels, pathCommitments, pathConnections } from "../../paths";
import { style } from "../../style";

interface CommitmentsListProps {
  readonly connectionId: string;
  readonly portId: string;
  readonly channelId: string;
}

export function CommitmentsList({ connectionId, portId, channelId }: CommitmentsListProps): JSX.Element {
  const paramConnection = `${pathConnections}/${connectionId}`;

  const { getClient } = useClient();
  const [packetCommitmentsResponse, setPacketCommitmentsResponse] = useState<IbcPacketCommitmentsResponse>();

  useEffect(() => {
    (async function updatePacketCommitmentsResponse() {
      const packetCommitmentsResponse = await getClient().ibc.unverified.packetCommitments(portId, channelId);
      setPacketCommitmentsResponse(packetCommitmentsResponse);
    })();
  }, [getClient, portId, channelId]);

  return packetCommitmentsResponse?.commitments?.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Packet commitments</span>
      <div className="flex flex-row flex-wrap">
        {packetCommitmentsResponse.commitments.map((commitment, index) => {
          const portIdChannelId = `${commitment.portId}${portIdChannelIdSeparator}${commitment.channelId}`;
          const paramChannel = `${pathChannels}/${portIdChannelId}`;
          const paramCommitment = `${pathCommitments}/${commitment.sequence}`;

          return (
            <Link
              to={`${paramConnection}${paramChannel}${paramCommitment}`}
              key={index}
              className={style.button}
            >
              <span>Sequence: {commitment.sequence ? commitment.sequence.toString(10) : "–"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No commitments found</div>
  );
}
