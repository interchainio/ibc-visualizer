import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketAcknowledgementsResponse } from "../../../types/ibc";
import { pathAcknowledgement } from "../../paths";
import { style } from "../../style";

interface AcknowledgementsListProps {
  readonly portId: string;
  readonly channelId: string;
}

export function AcknowledgementsList({ portId, channelId }: AcknowledgementsListProps): JSX.Element {
  const { getClient } = useClient();
  const [packetAcknowledgementsResponse, setPacketAcknowledgementsResponse] = useState(
    new IbcPacketAcknowledgementsResponse(),
  );

  useEffect(() => {
    (async function updatePacketAcknowledgementsResponse() {
      const acketAcknowledgementsResponse = await getClient().ibc.unverified.packetAcknowledgements(
        portId,
        channelId,
      );
      setPacketAcknowledgementsResponse(new IbcPacketAcknowledgementsResponse(acketAcknowledgementsResponse));
    })();
  }, [getClient, portId, channelId]);

  return packetAcknowledgementsResponse.acknowledgements.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Packet acknowledgements</span>
      <div className="flex flex-row flex-wrap">
        {packetAcknowledgementsResponse.acknowledgements.map((acknowledgement, index) => (
          <Link
            to={`${pathAcknowledgement}/${portId}/${channelId}/${acknowledgement.sequence}`}
            key={index}
            className={style.button}
          >
            <span>Sequence: {acknowledgement.sequence ? acknowledgement.sequence.toString(10) : "–"}</span>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No acknowledgements found</div>
  );
}
