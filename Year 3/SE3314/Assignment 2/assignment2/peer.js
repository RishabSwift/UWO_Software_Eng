const minimist = require('minimist');
const net = require('net');
const path = require('path');
const Singleton = require('./Singleton');
const CTPHandler = require('./CTPHandler');
const handler = require('./ClientsHandler');


net.bytesWritten = 300000;
net.bufferSize = 300000;

Singleton.init();

// get user arguments -- used from assignment 1
const arguments = minimist(process.argv);

// get the -p argument from console
let serverInfo = arguments['p'];
let currDir = path.basename(path.resolve(process.cwd())); // get base directory name
let currDirNoDash = currDir.split('-')[0]; // only get the name.. no dash from folder
let maxPeerSize = currDir.split('-')[1]; // after the dash is the max peer size
let serverHost = '127.0.0.1'; // default host
let serverPort = Singleton.getRandomNumber(49152, 65535); // range of ephemeral ports
let peerHost = '127.0.0.1';
let peerPort = null; // we don't have the port yet...
let isPeer = false; // determine if requests is from peer or not
let version = 7;


let messageTypes = {
    welcome: 1,
    redirect: 2,
}
//
// // this table holds all the peer lists
let peerTable = [];

function Peer(host, port) {
    this.host = host;
    this.port = port;
}

// determine if there was a -p argument passed in
if (serverInfo !== undefined) {
    let server = serverInfo.split(':');

    peerHost = server[0].trim(); // trim it in case there is a space on either side of a colon
    peerPort = server[1].trim();

    isPeer = true;
} else {
    isPeer = false;
}



let server = net.createServer();
let client = null;

// if it's a peer, then create a new client socket connection
if (isPeer) {

    client = new net.Socket();

    client.connect({
        host: peerHost,
        port: peerPort,
        localAddress: serverHost,
        localPort: serverPort,
    })

    // when we get data from the peer
    client.on('data', data => {

        data = CTPHandler.parseData(data);

        // if version is not 7... ignore
        if (data.version !== 7) {
            return;
        }

        // only show connected message if connected...
        if (data.messageType === messageTypes.welcome) {
            console.log(`Connected to peer ${data.dirName}${data.numberOfPeers}:${peerPort} at timestamp: ${Singleton.getTimestamp()}`)
        }

        console.log(`This peer address is ${serverHost}:${serverPort} located at ${currDirNoDash}`)
        console.log(`Received ack from ${data.dirName}${data.numberOfPeers}:${peerPort}`)


        // if the data we received has peer information...
        if (data.containsPeerInfo) {


            // update our peer table
            peerTable.push(new Peer(data.peerHost, data.peerPort))

            // get the list of connections in the peer table in a string format
            let peers = '';
            peerTable.forEach(item => {
                peers += `[${item.host}:${item.port}],`
            })

            peers = peers.slice(0, -1); // remove last character

            console.log(`    Which is peered with: ${peers}\n`);
            // console.log(`    Which is peered with: [${data.peerHost}:${data.peerPort}]\n`);
        }

        // if it's a redirect, decline the join and rejoin
        if (data.messageType === messageTypes.redirect) {
            console.log(`This join has been declined; the auto-join process is performing ...`)
        }


    })

    // an error occurred
    client.on('error', error => {
        console.log('Error occurred: ' + error.message)
    })



    client.on('close', () => {
        server.listen(serverPort, serverHost);
    })


} else {
    server.listen(serverPort, serverHost);
    console.log(`This peer address is ${serverHost}:${serverPort} located at ${currDirNoDash}\n`)
}

server.on('connection', (sock) => {
    handler.handleClientJoining({sock, version, currDir, maxPeerSize, peerTable})
})
