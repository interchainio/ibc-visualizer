import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Navigation } from "../../components/Navigation";
import { style } from "../../style";
import { AcknowledgementsList } from "./AcknowledgementsList";
import { ChannelData } from "./ChannelData";
import { CommitmentsList } from "./CommitmentsList";
import { NextSequenceReceiveData } from "./NextSequenceReceiveData";
import { SequenceForm } from "./SequenceForm";
import { UnreceivedAcksList } from "./UnreceivedAcksList";
import { UnreceivedPacketsList } from "./UnreceivedPacketsList";

interface ChannelParams {
  readonly portId: string;
  readonly channelId: string;
}

export function Channel(): JSX.Element {
  const { portId, channelId } = useParams<ChannelParams>();
  const [sequence, setSequence] = useState<number>();

  return (
    <div className="container mx-auto">
      <Navigation />
      <div className="flex flex-col">
        <span className={style.title}>Channel</span>
        {portId ? <span>Port ID: {portId}</span> : null}
        {channelId ? <span>Channel ID: {channelId}</span> : null}
      </div>
      <ChannelData portId={portId} channelId={channelId} />
      <NextSequenceReceiveData portId={portId} channelId={channelId} />
      <CommitmentsList portId={portId} channelId={channelId} />
      <AcknowledgementsList portId={portId} channelId={channelId} />
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
