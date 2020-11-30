# IBC Visualizer

A visualizer for [IBC](https://github.com/cosmos/ics/tree/master/ibc) queries

## How to run local demo

The demo is SDK `v0.40.0-rc3` compatible, please follow these steps in order to run it:

1. Make sure Docker is installed in your system
2. Clone [CosmJS](https://github.com/cosmos/cosmjs) `v0.24.0-alpha.10` or later
3. In the `cosmjs/scripts/simapp` directory, run:
   ```shell
   ./start.sh
   ```
4. In the `ibc-visualizer` project root, run:
   ```shell
   yarn install
   yarn start
   ```

## Views

Every view has navigation breadcrumbs with links to the previous views.

### Connections

The `Connections` view lists all the connections grouped by client. Each listed connection is a link that redirects to the corresponding `Connection` view.

![connections](screenshots/connections.png)

### Connection

This view shows details for the chosen connection and lists all its channels. Each listed channel is a link that redirects to the corresponding `Channel` view.

![connection](screenshots/connection.png)

### Channel

This view shows details for the chosen channel.

The lists of packet commitments and acknowledgements have links that let the user go to the corresponding `Commitment` or `Acknowledgement` view.

There is a form for entering the sequence number with which to query the unreceived packets and acknowledgements.

![channel](screenshots/channel.png)

### Commitment

This view shows details for the chosen commitment.

![commitment](screenshots/commitment.png)

### Acknowledgement

This view shows details for the chosen acknowledgement.

![acknowledgement](screenshots/acknowledgement.png)
