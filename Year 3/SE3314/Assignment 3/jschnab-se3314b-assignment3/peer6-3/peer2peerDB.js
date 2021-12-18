let net = require("net"),
    singleton = require("./Singleton"),
    handler = require("./PeersHandler"),
    path = require('path');

singleton.init();

let os = require("os");
let ifaces = os.networkInterfaces();
let HOST = "";
let PORT = singleton.getPort(); //get random port number
let IMAGE_PORT = singleton.getPort();

// get the loaclhost ip address
Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
        if ("IPv4" == iface.family && iface.internal !== false) {
            HOST = iface.address;
        }
    });
});


// get current folder name
let currDir = path.basename(path.resolve(process.cwd()))
let peerLocation = currDir.split('-')[0];
let maxPeerSize = currDir.split('-')[1];

// start image db
let imageDB = net.createServer();
imageDB.listen(IMAGE_PORT, HOST);

console.log('ImageDB server is started at timestamp: ' + singleton.getTimestamp() + ' and is listening on ' + HOST + ':' + IMAGE_PORT);


imageDB.on('connection', function (sock) {
    // handler.handleImageRequest(sock, peerLocation, [], maxPeerSize); //called for each client joining
});



// if there's a peer
if (process.argv.length > 2) {
    // call as node peer [-p <serverIP>:<port>]

    // run as a client
    // this needs more work to properly filter command line arguments
    let firstFlag = process.argv[2]; // should be -p
    let hostserverIPandPort = process.argv[3].split(":");

    let knownHOST = hostserverIPandPort[0];
    let knownPORT = hostserverIPandPort[1];
    let peerTableDeclined = [];

    // connect to the known peer address
    let clientPeer = new net.Socket();
    clientPeer.connect(knownPORT, knownHOST, function () {
        // initialize peer table
        let peerTable = []; // array of objects
        // peerTable format
        // [{
        //   peerIP: peer ip address,
        //   peerPort: peer port number
        // }]

        // declined peer table

        handler.handleCommunications(clientPeer, maxPeerSize, peerLocation, peerTable, peerTableDeclined);
    });
} else {
    //* WHAT THE SERVER SEES
    // call as node peer (no arguments)
    // run as a server
    let serverPeer = net.createServer();
    serverPeer.listen(PORT, HOST);


    console.log("This peer address is " + HOST + ":" + PORT + " located at " + peerLocation);

    // initialize peer table
    let peerTable = [];
    let peerDeclinedTable = [];
    serverPeer.on("connection", function (sock) {
        // received connection request
        handler.handleClientJoining(sock, maxPeerSize, peerLocation, peerTable, peerDeclinedTable);
    });
}
