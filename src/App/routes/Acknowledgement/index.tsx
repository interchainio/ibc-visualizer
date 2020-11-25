import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketAcknowledgementResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { pathChannel } from "../../paths";
import { style } from "../../style";

interface AcknowledgementParams {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: string;
}

export function Acknowledgement(): JSX.Element {
  const { portId, channelId, sequence } = useParams<AcknowledgementParams>();
  const { getClient } = useClient();

  const [ackResponse, setAckResponse] = useState<IbcPacketAcknowledgementResponse>();

  useEffect(() => {
    const sequenceNumber = Number.parseInt(sequence, 10);

    (async function updateAckResponse() {
      const ackResponse = await getClient().ibc.unverified.packetAcknowledgement(
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
      <Link to={`${pathChannel}/${portId}/${channelId}`} className={`${style.button} self-start`}>
        ← Back to Channel
      </Link>
      <span className={style.title}>Acknowledgement</span>
      {portId ? <span>Port ID: {portId}</span> : null}
      {channelId ? <span>Channel ID: {channelId}</span> : null}
      {sequence ? <span>Sequence: {sequence}</span> : null}
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
