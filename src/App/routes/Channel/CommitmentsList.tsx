import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useClient } from "../../../contexts/ClientContext";
import { IbcPacketCommitmentsResponse } from "../../../types/ibc";
import { pathCommitment } from "../../paths";
import { style } from "../../style";

interface CommitmentsListProps {
  readonly portId: string;
  readonly channelId: string;
}

export function CommitmentsList({ portId, channelId }: CommitmentsListProps): JSX.Element {
  const { getClient } = useClient();
  const [packetCommitmentsResponse, setPacketCommitmentsResponse] = useState<IbcPacketCommitmentsResponse>();

  useEffect(() => {
    (async function updatePacketCommitmentsResponse() {
      const packetCommitmentsResponse = await getClient().ibc.unverified.packetCommitments(portId, channelId);
      setPacketCommitmentsResponse(packetCommitmentsResponse);
    })();
  }, [getClient, portId, channelId]);

  return packetCommitmentsResponse?.commitments?.length ? (
    <div className="flex flex-col m-2 ml-0">
      <span className={style.subtitle}>Packet commitments</span>
      <div className="flex flex-row flex-wrap">
        {packetCommitmentsResponse.commitments.map((commitment, index) => (
          <Link
            to={`${pathCommitment}/${portId}/${channelId}/${commitment.sequence}`}
            key={index}
            className={style.button}
          >
            <span>Sequence: {commitment.sequence ? commitment.sequence.toString(10) : "–"}</span>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className={style.subtitle}>No commitments found</div>
  );
}
