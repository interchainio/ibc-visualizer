import { toHex } from "@cosmjs/encoding";
import React, { useEffect, useState } from "react";

import { useClient } from "../../../contexts/ClientContext";
import { IbcChannelResponse } from "../../../types/ibc";
import { printIbcChannelState, printIbcOrder } from "../../../utils/ibc";
import { CounterpartyData } from "../../components/ChannelCounterpartyData";
import { HeightData } from "../../components/HeightData";
import { style } from "../../style";

interface ChannelDataProps {
  readonly portId: string;
  readonly channelId: string;
}

export function ChannelData({ portId, channelId }: ChannelDataProps): JSX.Element {
  const { getClient } = useClient();
  const [channelResponse, setChannelResponse] = useState<IbcChannelResponse>();

  useEffect(() => {
    (async function updateChannelResponse() {
      const channelResponse = await getClient().ibc.channel.channel(portId, channelId);
      setChannelResponse(channelResponse);
    })();
  }, [getClient, portId, channelId]);

  return channelResponse?.channel ? (
    <div>
      <div className={style.title}>Data</div>
      {portId && <div>Port ID: {portId}</div>}
      {channelId && <div>Channel ID: {channelId}</div>}
      <div>Proof: {channelResponse.proof?.length ? toHex(channelResponse.proof) : "–"}</div>
      <HeightData height={channelResponse.proofHeight} />
      <div className="flex flex-col">
        <span>
          State: {channelResponse.channel.state ? printIbcChannelState(channelResponse.channel.state) : "–"}
        </span>
        <span>Version: {channelResponse.channel.version ?? "–"}</span>
        <span>
          Ordering: {channelResponse.channel.ordering ? printIbcOrder(channelResponse.channel.ordering) : "–"}
        </span>
        <CounterpartyData counterparty={channelResponse.channel.counterparty ?? null} />
        <span>
          Connection hops:{" "}
          {channelResponse.channel.connectionHops ? channelResponse.channel.connectionHops.join(", ") : "–"}
        </span>
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No channel found</div>
  );
}
