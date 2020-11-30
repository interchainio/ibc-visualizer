import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { portIdChannelIdSeparator } from "../..";
import { useClient } from "../../../contexts/ClientContext";
import { IbcChannelsResponse, IbcConnectionChannelsResponse } from "../../../types/ibc";
import { ellideMiddle } from "../../../utils/strings";
import { pathChannels, pathConnections } from "../../paths";
import { style } from "../../style";

interface ChannelsListProps {
  readonly connectionId: string;
}

export function ChannelsList({ connectionId }: ChannelsListProps): JSX.Element {
  const paramConnection = `${pathConnections}/${connectionId}`;

  const { getClient } = useClient();
  const [channelsResponse, setChannelsResponse] = useState<
    IbcChannelsResponse | IbcConnectionChannelsResponse
  >();

  useEffect(() => {
    (async function updateChannelsResponse() {
      const channelsResponse = await getClient().ibc.unverified.connectionChannels(connectionId);
      setChannelsResponse(channelsResponse);
    })();
  }, [connectionId, getClient]);

  async function loadMoreChannels(): Promise<void> {
    if (!channelsResponse?.pagination?.nextKey?.length) return;

    const newChannelsResponse = await getClient().ibc.unverified.connectionChannels(
      connectionId,
      channelsResponse.pagination.nextKey,
    );

    const oldChannels = channelsResponse.channels ?? [];
    const newChannels = newChannelsResponse.channels ?? [];

    setChannelsResponse({
      ...newChannelsResponse,
      channels: [...oldChannels, ...newChannels],
    });
  }

  return channelsResponse?.channels?.length ? (
    <div>
      <span className={style.title}>Channels</span>
      <div className="flex flex-row flex-wrap">
        {channelsResponse.channels.map((channel, index) => {
          const portIdChannelId = `${channel.portId}${portIdChannelIdSeparator}${channel.channelId}`;
          const paramChannel = `${pathChannels}/${portIdChannelId}`;

          return (
            <Link to={`${paramConnection}${paramChannel}`} key={index} className={style.button}>
              <span>{`${ellideMiddle(channel.portId ?? "–", 20)} | ${ellideMiddle(
                channel.channelId ?? "–",
                20,
              )}`}</span>
            </Link>
          );
        })}
      </div>
      {channelsResponse.pagination?.nextKey?.length ? (
        <button onClick={loadMoreChannels} className={style.button}>
          Load more
        </button>
      ) : null}
    </div>
  ) : (
    <span className={style.title}>No channels found</span>
  );
}
