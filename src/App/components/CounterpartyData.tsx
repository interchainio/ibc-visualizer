import { toHex } from "@cosmjs/encoding";
import React from "react";

import { IbcChannelCounterparty, IbcConnectionCounterparty } from "../../types/ibc";
import { style } from "../style";

interface CounterpartyDataProps {
  readonly counterparty?: (IbcConnectionCounterparty & IbcChannelCounterparty) | null;
}

export function CounterpartyData({ counterparty }: CounterpartyDataProps): JSX.Element {
  return (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Counterparty</span>
      {counterparty?.clientId ? <span>Client ID: {counterparty.clientId}</span> : null}
      {counterparty?.connectionId ? <span>Connection ID: {counterparty.connectionId}</span> : null}
      {counterparty?.prefix?.keyPrefix?.length ? (
        <span>Prefix: {toHex(counterparty?.prefix?.keyPrefix)}</span>
      ) : null}
      {counterparty?.portId ? <span>Port ID: {counterparty.portId}</span> : null}
      {counterparty?.channelId ? <span>Channel ID: {counterparty.channelId}</span> : null}
    </div>
  );
}
