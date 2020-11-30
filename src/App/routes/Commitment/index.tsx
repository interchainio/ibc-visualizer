import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketCommitmentResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { style } from "../../style";

interface CommitmentParams {
  readonly portIdChannelId: string;
  readonly sequence: string;
}

export function Commitment(): JSX.Element {
  const { portIdChannelId, sequence } = useParams<CommitmentParams>();
  const [portId, channelId] = portIdChannelId.split(portIdChannelIdSeparator);

  const { getClient } = useClient();
  const [commitmentResponse, setCommitmentResponse] = useState<IbcPacketCommitmentResponse>();

  useEffect(() => {
    const sequenceNumber = Number.parseInt(sequence, 10);

    (async function updateCommitmentResponse() {
      const commitmentResponse = await getClient().ibc.unverified.packetCommitment(
        portId,
        channelId,
        sequenceNumber,
      );
      setCommitmentResponse(commitmentResponse);
    })();
  }, [sequence, getClient, portId, channelId]);

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <span className={style.title}>Data</span>
      {portId ? <span>Port ID: {portId}</span> : null}
      {channelId ? <span>Channel ID: {channelId}</span> : null}
      {sequence ? <span>Sequence: {sequence}</span> : null}
      {commitmentResponse?.commitment ? (
        <div className="flex flex-col">
          <span>Proof: {commitmentResponse.proof?.length ? toHex(commitmentResponse.proof) : "–"}</span>
          <HeightData height={commitmentResponse.proofHeight} />
          <span>Data: {toHex(commitmentResponse.commitment)}</span>
        </div>
      ) : (
        <span>No commitment found</span>
      )}
    </div>
  );
}
