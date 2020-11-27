import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { Navigation } from "../../components/Navigation";
import { AcknowledgementsList } from "./AcknowledgementsList";
import { ChannelData } from "./ChannelData";
import { CommitmentsList } from "./CommitmentsList";
import { NextSequenceReceiveData } from "./NextSequenceReceiveData";
import { SequenceForm } from "./SequenceForm";
import { UnreceivedAcksList } from "./UnreceivedAcksList";
import { UnreceivedPacketsList } from "./UnreceivedPacketsList";

interface ChannelParams {
  readonly connectionId: string;
  readonly portIdChannelId: string;
}

export function Channel(): JSX.Element {
  const { connectionId, portIdChannelId } = useParams<ChannelParams>();
  const [portId, channelId] = portIdChannelId.split(portIdChannelIdSeparator);

  const [sequence, setSequence] = useState<number>();

  return (
    <div className="container mx-auto">
      <Navigation />
      <ChannelData portId={portId} channelId={channelId} />
      <NextSequenceReceiveData portId={portId} channelId={channelId} />
      <CommitmentsList connectionId={connectionId} portId={portId} channelId={channelId} />
      <AcknowledgementsList connectionId={connectionId} portId={portId} channelId={channelId} />
      <SequenceForm sequence={sequence} setSequence={setSequence} />
      {sequence ? (
        <>
          <UnreceivedPacketsList portId={portId} channelId={channelId} sequence={sequence} />
          <UnreceivedAcksList portId={portId} channelId={channelId} sequence={sequence} />
        </>
      ) : null}
    </div>
  );
}
