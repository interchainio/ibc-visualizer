import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { ClientProvider } from "../contexts/ClientContext";
import {
  pathAcknowledgement,
  pathChannel,
  pathChannels,
  pathCommitment,
  pathConnection,
  pathConnections,
} from "./paths";
import { Acknowledgement } from "./routes/Acknowledgement";
import { Channel } from "./routes/Channel";
import { Channels } from "./routes/Channels";
import { Commitment } from "./routes/Commitment";
import { Connection } from "./routes/Connection";
import { Connections } from "./routes/Connections";

export function App(): JSX.Element {
  return (
    <ClientProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path={`${pathConnections}/:clientId?`} component={Connections} />
          <Route exact path={`${pathConnection}/:connectionId`} component={Connection} />
          <Route exact path={`${pathChannels}/:connectionId?`} component={Channels} />
          <Route exact path={`${pathChannel}/:portId/:channelId`} component={Channel} />
          <Route exact path={`${pathCommitment}/:portId/:channelId/:sequence`} component={Commitment} />
          <Route
            exact
            path={`${pathAcknowledgement}/:portId/:channelId/:sequence`}
            component={Acknowledgement}
          />
          <Route component={() => <Redirect to={pathConnections} />} />
        </Switch>
      </Router>
    </ClientProvider>
  );
}
