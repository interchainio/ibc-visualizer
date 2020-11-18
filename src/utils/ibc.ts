import { IbcChannelState, IbcConnectionState, IbcOrder } from "../types/ibc";

export function printIbcConnectionState(state: number): string {
  switch (state) {
    case IbcConnectionState.STATE_INIT:
      return "Initial";
    case IbcConnectionState.STATE_TRYOPEN:
      return "Trying to open";
    case IbcConnectionState.STATE_OPEN:
      return "Open";
    default:
      return "Unspecified";
  }
}

export function printIbcChannelState(state: number): string {
  switch (state) {
    case IbcChannelState.STATE_INIT:
      return "Initial";
    case IbcChannelState.STATE_TRYOPEN:
      return "Trying to open";
    case IbcChannelState.STATE_OPEN:
      return "Open";
    case IbcChannelState.STATE_CLOSED:
      return "Closed";
    default:
      return "Unspecified";
  }
}

export function printIbcOrder(order: number): string {
  switch (order) {
    case IbcOrder.ORDER_UNORDERED:
      return "Unordered";
    case IbcOrder.ORDER_ORDERED:
      return "Ordered";
    default:
      return "Unspecified";
  }
}
