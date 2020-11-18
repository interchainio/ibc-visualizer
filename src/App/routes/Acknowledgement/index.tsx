import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketAcknowledgementResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { style } from "../../style";

interface AcknowledgementParams {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: string;
}

export function Acknowledgement(): JSX.Element {
  const { portId, channelId, sequence } = useParams<AcknowledgementParams>();
  const { getClient } = useClient();

  const [ackResponse, setAckResponse] = useState(new IbcPacketAcknowledgementResponse());

  useEffect(() => {
    const sequenceNumber = Number.parseInt(sequence, 10);

    (async function updateAckResponse() {
      const ackResponse = await getClient().ibc.unverified.packetAcknowledgement(
        portId,
        channelId,
        sequenceNumber,
      );
      setAckResponse(new IbcPacketAcknowledgementResponse(ackResponse));
    })();
  }, [sequence, getClient, portId, channelId]);

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <span className={style.title}>Acknowledgement</span>
      {portId ? <span>Port ID: {portId}</span> : null}
      {channelId ? <span>Channel ID: {channelId}</span> : null}
      {sequence ? <span>Sequence: {sequence}</span> : null}
      {ackResponse.acknowledgement ? (
        <div className="flex flex-col">
          <span>Proof: {ackResponse.proof.length ? `[${ackResponse.proof.toString()}]` : "–"}</span>
          <HeightData height={ackResponse.proofHeight} />
          <span>Data: {`[${ackResponse.acknowledgement.toString()}]`}</span>
        </div>
      ) : (
        <span className={style.title}>No acknowledgement found</span>
      )}
    </div>
  );
}
