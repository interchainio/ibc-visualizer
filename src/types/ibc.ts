import { codec } from "@cosmjs/stargate";

// IBC common types
export type IbcConnectionState = codec.ibc.core.connection.v1.State;
export const IbcConnectionState = codec.ibc.core.connection.v1.State;
export type IbcConnectionCounterparty = codec.ibc.core.connection.v1.ICounterparty;
export type IbcChannelState = codec.ibc.core.channel.v1.State;
export const IbcChannelState = codec.ibc.core.channel.v1.State;
export type IbcChannelCounterparty = codec.ibc.core.channel.v1.ICounterparty;
export type IbcOrder = codec.ibc.core.channel.v1.Order;
export const IbcOrder = codec.ibc.core.channel.v1.Order;
export type IbcHeight = codec.ibc.core.client.v1.IHeight;

// IBC connection responses
export type IbcConnectionsResponse = codec.ibc.core.connection.v1.IQueryConnectionsResponse;
export type IbcClientConnectionsResponse = codec.ibc.core.connection.v1.IQueryClientConnectionsResponse;
export type IbcConnectionResponse = codec.ibc.core.connection.v1.IQueryConnectionResponse;

// IBC channel responses
export type IbcChannelsResponse = codec.ibc.core.channel.v1.IQueryChannelsResponse;
export type IbcConnectionChannelsResponse = codec.ibc.core.channel.v1.IQueryConnectionChannelsResponse;
export type IbcChannelResponse = codec.ibc.core.channel.v1.IQueryChannelResponse;

// IBC packet responses
export type IbcNextSequenceReceiveResponse = codec.ibc.core.channel.v1.IQueryNextSequenceReceiveResponse;
export type IbcPacketCommitmentsResponse = codec.ibc.core.channel.v1.IQueryPacketCommitmentsResponse;
export type IbcPacketCommitmentResponse = codec.ibc.core.channel.v1.IQueryPacketCommitmentResponse;
export type IbcPacketAcknowledgementsResponse = codec.ibc.core.channel.v1.IQueryPacketAcknowledgementsResponse;
export type IbcPacketAcknowledgementResponse = codec.ibc.core.channel.v1.IQueryPacketAcknowledgementResponse;
export type IbcUnreceivedPacketsResponse = codec.ibc.core.channel.v1.IQueryUnreceivedPacketsResponse;
export type IbcUnreceivedAcksResponse = codec.ibc.core.channel.v1.IQueryUnreceivedAcksResponse;
