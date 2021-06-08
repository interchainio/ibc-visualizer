import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketAcknowledgementsResponse } from "../../../types/ibc";
import { pathAcknowledgements, pathChannels, pathConnections } from "../../paths";
import { style } from "../../style";

interface AcknowledgementsListProps {
  readonly connectionId: string;
  readonly portId: string;
  readonly channelId: string;
}

export function AcknowledgementsList({
  connectionId,
  portId,
  channelId,
}: AcknowledgementsListProps): JSX.Element {
  const paramConnection = `${pathConnections}/${connectionId}`;

  const { getClient } = useClient();
  const [packetAcknowledgementsResponse, setPacketAcknowledgementsResponse] = useState<
    IbcPacketAcknowledgementsResponse
  >();

  useEffect(() => {
    (async function updatePacketAcknowledgementsResponse() {
      const acketAcknowledgementsResponse = await getClient().ibc.channel.packetAcknowledgements(
        portId,
        channelId,
      );
      setPacketAcknowledgementsResponse(acketAcknowledgementsResponse);
    })();
  }, [getClient, portId, channelId]);

  return packetAcknowledgementsResponse?.acknowledgements?.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Packet acknowledgements</span>
      <div className="flex flex-row flex-wrap">
        {packetAcknowledgementsResponse.acknowledgements.map((acknowledgement, index) => {
          const portIdChannelId = `${acknowledgement.portId}${portIdChannelIdSeparator}${acknowledgement.channelId}`;
          const paramChannel = `${pathChannels}/${portIdChannelId}`;
          const paramAcknowledgement = `${pathAcknowledgements}/${acknowledgement.sequence}`;

          return (
            <Link
              to={`${paramConnection}${paramChannel}${paramAcknowledgement}`}
              key={index}
              className={style.link}
            >
              <span>Sequence: {acknowledgement.sequence ? acknowledgement.sequence.toString(10) : "–"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No acknowledgements found</div>
  );
}
