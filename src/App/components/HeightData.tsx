import { ibc } from "@cosmjs/stargate/types/codec";
import React from "react";

import { style } from "../style";

interface HeightDataProps {
  readonly height?: ibc.core.client.v1.IHeight | null;
}

export function HeightData({ height }: HeightDataProps): JSX.Element {
  return (
    <div className="m-2 ml-0">
      <span className={style.subtitle}>Height</span>
      <div className="flex flex-col">
        <span>Version height: {height?.versionHeight?.toString(10) ?? "–"}</span>
        <span>Version number: {height?.versionNumber?.toString(10) ?? "–"}</span>
      </div>
    </div>
  );
}
