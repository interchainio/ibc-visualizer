import React from "react";
import { useParams } from "react-router-dom";

import { Navigation } from "../../components/Navigation";
import { ChannelsList } from "./ChannelsList";
import { ConnectionData } from "./ConnectionData";

interface ConnectionParams {
  readonly connectionId: string;
}

export function Connection(): JSX.Element {
  const { connectionId } = useParams<ConnectionParams>();

  return (
    <div className="container mx-auto flex flex-col">
      <Navigation />
      <ConnectionData connectionId={connectionId} />
      <ChannelsList connectionId={connectionId} />
    </div>
  );
}
