import React from "react";

import { IbcHeight } from "../../types/ibc";
import { style } from "../style";

interface HeightDataProps {
  readonly height?: IbcHeight | null;
}

export function HeightData({ height }: HeightDataProps): JSX.Element {
  return (
    <div className="m-2 ml-0">
      <span className={style.subtitle}>Height</span>
      <div className="flex flex-col">
        <span>Version height: {height?.revisionHeight?.toString(10) ?? "–"}</span>
        <span>Version number: {height?.revisionNumber?.toString(10) ?? "–"}</span>
      </div>
    </div>
  );
}
