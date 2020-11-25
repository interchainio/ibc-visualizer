import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketCommitmentResponse } from "../../../types/ibc";
import { HeightData } from "../../components/HeightData";
import { Navigation } from "../../components/Navigation";
import { pathChannel } from "../../paths";
import { style } from "../../style";

interface CommitmentParams {
  readonly portId: string;
  readonly channelId: string;
  readonly sequence: string;
}

export function Commitment(): JSX.Element {
  const { portId, channelId, sequence } = useParams<CommitmentParams>();
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
      <Link to={`${pathChannel}/${portId}/${channelId}`} className={`${style.button} self-start`}>
        ← Back to Channel
      </Link>
      <span className={style.title}>Commitment</span>
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
