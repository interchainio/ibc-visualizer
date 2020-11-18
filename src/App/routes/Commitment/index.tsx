import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketCommitmentResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { style } from "../../style";

interface CommitmentParams {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: string;
}

export function Commitment(): JSX.Element {
  const { portId, channelId, sequence } = useParams<CommitmentParams>();
  const { getClient } = useClient();

  const [commitmentResponse, setCommitmentResponse] = useState(new IbcPacketCommitmentResponse());

  useEffect(() => {
    const sequenceNumber = Number.parseInt(sequence, 10);

    (async function updateCommitmentResponse() {
      const commitmentResponse = await getClient().ibc.unverified.packetCommitment(
        portId,
        channelId,
        sequenceNumber,
      );
      setCommitmentResponse(new IbcPacketCommitmentResponse(commitmentResponse));
    })();
  }, [sequence, getClient, portId, channelId]);

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <span className={style.title}>Commitment</span>
      {portId ? <span>Port ID: {portId}</span> : null}
      {channelId ? <span>Channel ID: {channelId}</span> : null}
      {sequence ? <span>Sequence: {sequence}</span> : null}
      {commitmentResponse.commitment ? (
        <div className="flex flex-col">
          <span>
            Proof: {commitmentResponse.proof.length ? `[${commitmentResponse.proof.toString()}]` : "–"}
          </span>
          <HeightData height={commitmentResponse.proofHeight} />
          <span>Data: {`[${commitmentResponse.commitment.toString()}]`}</span>
        </div>
      ) : (
        <span>No commitment found</span>
      )}
    </div>
  );
}
