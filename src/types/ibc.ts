import { codec } from "@cosmjs/stargate";

const connection = codec.ibc.core.connection.v1;
const channel = codec.ibc.core.channel.v1;

// IBC common types
export const IbcConnectionState = connection.State;
export const IbcChannelState = channel.State;
export const IbcOrder = channel.Order;

// IBC connection responses
export const IbcConnectionsResponse = connection.QueryConnectionsResponse;
export const IbcClientConnectionsResponse = connection.QueryClientConnectionsResponse;
export const IbcConnectionResponse = connection.QueryConnectionResponse;

// IBC channel responses
export const IbcChannelsResponse = channel.QueryChannelsResponse;
export const IbcConnectionChannelsResponse = channel.QueryConnectionChannelsResponse;
export const IbcChannelResponse = channel.QueryChannelResponse;

// IBC packet responses
export const IbcNextSequenceReceiveResponse = channel.QueryNextSequenceReceiveResponse;
export const IbcPacketCommitmentsResponse = channel.QueryPacketCommitmentsResponse;
export const IbcPacketCommitmentResponse = channel.QueryPacketCommitmentResponse;
export const IbcPacketAcknowledgementsResponse = channel.QueryPacketAcknowledgementsResponse;
export const IbcPacketAcknowledgementResponse = channel.QueryPacketAcknowledgementResponse;
export const IbcUnreceivedPacketsResponse = channel.QueryUnreceivedPacketsResponse;
export const IbcUnreceivedAcksResponse = channel.QueryUnreceivedAcksResponse;
