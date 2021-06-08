import React from "react";

import { IbcChannelCounterparty } from "../../types/ibc";
import { style } from "../style";

interface CounterpartyDataProps {
  readonly counterparty?: IbcChannelCounterparty | null;
}

export function CounterpartyData({ counterparty }: CounterpartyDataProps): JSX.Element {
  return (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Counterparty</span>
      {counterparty?.portId && <span>Port ID: {counterparty.portId}</span>}
      {counterparty?.channelId && <span>Channel ID: {counterparty.channelId}</span>}
    </div>
  );
}
