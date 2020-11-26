import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { ClientProvider } from "../contexts/ClientContext";
import { pathAcknowledgements, pathChannels, pathCommitments, pathConnections, pathSequences } from "./paths";
import { Acknowledgement } from "./routes/Acknowledgement";
import { Channel } from "./routes/Channel";
import { Commitment } from "./routes/Commitment";
import { Connection } from "./routes/Connection";
import { Connections } from "./routes/Connections";

export function App(): JSX.Element {
  return (
    <ClientProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path={pathConnections} component={Connections} />
          <Route exact path={`${pathConnections}/:connectionId`} component={Connection} />
          <Route exact path={`${pathConnections}/:channelId${pathChannels}/:portId`} component={Channel} />
          <Route
            exact
            path={`${pathConnections}/:channelId${pathCommitments}/:portId${pathSequences}/:sequence`}
            component={Commitment}
          />
          <Route
            exact
            path={`${pathConnections}/:channelId${pathAcknowledgements}/:portId${pathSequences}/:sequence`}
            component={Acknowledgement}
          />
          <Route component={() => <Redirect to={pathConnections} />} />
        </Switch>
      </Router>
    </ClientProvider>
  );
}
