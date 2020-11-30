import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { ClientProvider } from "../contexts/ClientContext";
import { pathAcknowledgements, pathChannels, pathCommitments, pathConnections } from "./paths";
import { Acknowledgement } from "./routes/Acknowledgement";
import { Channel } from "./routes/Channel";
import { Commitment } from "./routes/Commitment";
import { Connection } from "./routes/Connection";
import { Connections } from "./routes/Connections";

// portIdChannelId is a joined string of portId and channelId, with a ":" separator:
// <portId>:<channelId>
export const portIdChannelIdSeparator = ":";
const paramChannel = `${pathChannels}/:portIdChannelId`;

const paramConnection = `${pathConnections}/:connectionId`;
const paramCommitment = `${pathCommitments}/:sequence`;
const paramAcknowledgement = `${pathAcknowledgements}/:sequence`;

export function App(): JSX.Element {
  return (
    <ClientProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path={pathConnections} component={Connections} />
          <Route exact path={paramConnection} component={Connection} />
          <Route exact path={`${paramConnection}${paramChannel}`} component={Channel} />
          <Route exact path={`${paramConnection}${paramChannel}${paramCommitment}`} component={Commitment} />
          <Route
            exact
            path={`${paramConnection}${paramChannel}${paramAcknowledgement}`}
            component={Acknowledgement}
          />
          <Route component={() => <Redirect to={pathConnections} />} />
        </Switch>
      </Router>
    </ClientProvider>
  );
}
