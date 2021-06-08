import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketAcknowledgementResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { style } from "../../style";

interface AcknowledgementParams {
  readonly portIdChannelId: string;
  readonly sequence: string;
}

export function Acknowledgement(): JSX.Element {
  const { portIdChannelId, sequence } = useParams<AcknowledgementParams>();
  const [portId, channelId] = portIdChannelId.split(portIdChannelIdSeparator);

  const { getClient } = useClient();
  const [ackResponse, setAckResponse] = useState<IbcPacketAcknowledgementResponse>();

  useEffect(() => {
    const sequenceNumber = Number.parseInt(sequence, 10);

    (async function updateAckResponse() {
      const ackResponse = await getClient().ibc.channel.packetAcknowledgement(
        portId,
        channelId,
        sequenceNumber,
      );
      setAckResponse(ackResponse);
    })();
  }, [sequence, getClient, portId, channelId]);

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <span className={style.title}>Data</span>
      {portId && <span>Port ID: {portId}</span>}
      {channelId && <span>Channel ID: {channelId}</span>}
      {sequence && <span>Sequence: {sequence}</span>}
      {ackResponse?.acknowledgement ? (
        <div className="flex flex-col">
          <span>Proof: {ackResponse.proof?.length ? toHex(ackResponse.proof) : "–"}</span>
          <HeightData height={ackResponse.proofHeight} />
          <span>Data: {toHex(ackResponse.acknowledgement)}</span>
        </div>
      ) : (
        <span className={style.title}>No acknowledgement found</span>
      )}
    </div>
  );
}
