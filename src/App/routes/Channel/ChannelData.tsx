import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcChannelResponse } from "../../../types/ibc";
import { printIbcChannelState, printIbcOrder } from "../../../utils/ibc";
import { CounterpartyData } from "../../components/CounterpartyData";
import { HeightData } from "../../components/HeightData";
import { style } from "../../style";

interface ChannelDataProps {
  readonly portId: string;
  readonly channelId: string;
}

export function ChannelData({ portId, channelId }: ChannelDataProps): JSX.Element {
  const { getClient } = useClient();
  const [channelResponse, setChannelResponse] = useState(new IbcChannelResponse());

  useEffect(() => {
    (async function updateChannelResponse() {
      const channelResponse = await getClient().ibc.unverified.channel(portId, channelId);
      setChannelResponse(new IbcChannelResponse(channelResponse));
    })();
  }, [getClient, portId, channelId]);

  return channelResponse.channel ? (
    <div>
      <span>Proof: {channelResponse.proof.length ? `[${channelResponse.proof.toString()}]` : "–"}</span>
      <HeightData height={channelResponse.proofHeight} />
      <div className="flex flex-col">
        <span>
          State: {channelResponse.channel.state ? printIbcChannelState(channelResponse.channel.state) : "–"}
        </span>
        <span>Version: {channelResponse.channel.version ?? "–"}</span>
        <span>
          Ordering: {channelResponse.channel.ordering ? printIbcOrder(channelResponse.channel.ordering) : "–"}
        </span>
        <CounterpartyData counterparty={channelResponse.channel.counterparty} />
        <span>
          Connection hops:{" "}
          {channelResponse.channel.connectionHops ? channelResponse.channel.connectionHops.join(", ") : "–"}
        </span>
      </div>
    </div>
  ) : (
    <span className={style.subtitle}>No channel found</span>
  );
}
