let net = require("net"),
    cPTPpacket = require("./cPTPmessage"),
    singleton = require("./Singleton"),
    ITPpacket = require('./ITPResponse')

let isFull = {};
let peersToJoin = [];
let maxPeers, peerLocation;


function ipAndPortMatch(ip, matchIp, port, matchPort) {
    return ip == matchIp && port == matchPort;
}


let searchIDList = [];

// Prints the entire packet in bits format
function printPacketBit(packet) {
    var bitString = "";

    for (var i = 0; i < packet.length; i++) {
        // To add leading zeros
        var b = "00000000" + packet[i].toString(2);
        // To print 4 bytes per line
        if (i > 0 && i % 4 == 0) bitString += "\n";
        bitString += " " + b.substr(b.length - 8);
    }
    console.log(bitString);
}

let imageTimestamps = [];
let imageNames = [];
let imageSocket = null;

function prepareClientImageName(sock) {
    sock.id = sock.remoteAddress + ':' + sock.remotePort;
    let timestamp = singleton.getTimestamp();
    imageTimestamps[sock.id] = timestamp;
    imageNames[sock.id] = 'Client-' + timestamp;
}


module.exports = {
    handleClientJoining: function (sock, maxPeers, sender, peerTable, peerDeclinedTable) {
        let peersCount = peerTable.length;
        if (peersCount == maxPeers) {
            declineClient(sock, sender, peerTable, peerDeclinedTable);
        } else {
            handleClient(sock, sender, peerTable);
        }
    },

    handleCommunications: function (client, maxPeers, location, peerTable, peerTableDeclined) {
        communicate(client, maxPeers, location, peerTable, peerTableDeclined);
    },


    handleImageClient: function (sock, sender, peerTable, maxPeers) {

        prepareClientImageName(sock);

        let type;

        sock.on('data', data => {

            // send image
            console.log('\n' + imageNames[sock.id] + ' is connected at timestamp: ' + imageTimestamps[sock.id]);


        });

        // if connection is closed
        sock.on('end', () => {
            if (type == 0)
                console.log(`\n ${imageNames[sock.id]} closed the connection`);
        });

        sock.on('close', function () {

        });
    }
};


function communicate(client, maxPeers, location, peerTable, peerTableDeclined) {
    // get message from server

    client.on("data", (message) => {
        let bitMarker = 0;
        let version = parseBitPacket(message, 0, 3);
        bitMarker += 3;
        let msgType = parseBitPacket(message, 3, 8);
        bitMarker += 8;
        let numberOfPeers = parseBitPacket(message, 11, 13);
        bitMarker += 13;
        let SenderIDSize = parseBitPacket(message, 24, 8);
        bitMarker += 8;
        let sender = bytes2string(message.slice(4, SenderIDSize + 4));
        bitMarker += SenderIDSize * 8;
        let msgPeerTable = [];
        if (numberOfPeers > 0) {
            for (var i = 0; i < numberOfPeers; i++) {
                let firstOctet = parseBitPacket(message, bitMarker, 8);
                bitMarker += 8;
                let secondOctet = parseBitPacket(message, bitMarker, 8);
                bitMarker += 8;
                let thirdOctet = parseBitPacket(message, bitMarker, 8);
                bitMarker += 8;
                let forthOctet = parseBitPacket(message, bitMarker, 8);
                bitMarker += 8;
                let port = parseBitPacket(message, bitMarker, 16);

                bitMarker += 16;

                let aPeer = {
                    peerIP: firstOctet + "." + secondOctet + "." + thirdOctet + "." + forthOctet,
                    peerPort: port,
                };
                msgPeerTable.push(aPeer);
            }
        }

        if (msgType == 1) {
            isFull[client.remotePort] = false;
            console.log("Connected to peer " + sender + ":" + client.remotePort + " at timestamp: " + singleton.getTimestamp()
            );

            // add the server (the receiver request) into the table
            let receiverPeer = {
                peerIP: client.remoteAddress,
                peerPort: client.remotePort,
            };
            peerTable.push(receiverPeer);

            // Now run as a server
            let serverPeer = net.createServer();
            serverPeer.listen(client.localPort, client.localAddress);
            console.log("This peer address is " + client.localAddress + ":" + client.localPort + " located at " + location
            );
            serverPeer.on("connection", function (sock) {
                let peersCount = peerTable.length;
                if (peersCount == maxPeers) {
                    declineClient(sock, location, peerTable);
                } else {
                    handleClient(sock, location, peerTable);
                }
            });

            console.log("Received ack from " + sender + ":" + client.remotePort);
            if (numberOfPeers > 0) {
                let output = "  which is peered with: ";
                for (var i = 0; i < numberOfPeers - 1; i++) {
                    output += "[" + msgPeerTable[i].peerIP + ":" + msgPeerTable[i].peerPort + "], ";
                }
                output +=
                    "[" + msgPeerTable[i].peerIP + ":" + msgPeerTable[i].peerPort + "]";
                console.log(output);
            }
        } else {

            // Declined
            console.log("Received ack from " + sender + ":" + client.remotePort);
            isFull[client.remotePort] = true;

            peersToJoin = msgPeerTable;

            peerLocation = location;

            if (numberOfPeers > 0) {
                let output = "  which is peered with: ";
                for (var i = 0; i < numberOfPeers - 1; i++) {
                    output += "[" + msgPeerTable[i].peerIP + ":" + msgPeerTable[i].peerPort + "], ";
                }
                output += "[" + msgPeerTable[i].peerIP + ":" + msgPeerTable[i].peerPort + "]";
                console.log(output);
            }


            // Remove peer from peer table.. only if it maches...
            for (let i = 0; i < peerTable.length; i++) {
                if (ipAndPortMatch(peerTable[i].peerIP, client.remoteAddress, peerTable[i].peerPort, client.remotePort))
                    peerTable.splice(i, 1);
                break;
            }

            //add peer to declined table
            if (peerTableDeclined.length == maxPeers) {
                peerTableDeclined.splice(0, 1);
                peerTableDeclined.push({'port': client.remotePort, 'IP': client.remoteAddress});
            }

            // add peer

            console.log("\nThe join has been declined; the auto-join process is performing ...\n");

        }
    });
    client.on("end", () => {
        if (isFull[client.remotePort]) {

            let newConnections = false;


            // connect to the known peer address
            let newClientPeer = new net.Socket();
            // We will consider the first peer in the list, this is only for this assignment.
            // We must consider the new requirements in assignment 3.

            // * loop through all clients
            peersToJoin.forEach(peerElement => {
                // if (peerTable.length !== maxPeers) {


                let isInCurrentTable = false;
                let peerIndeclinedTable = false;

                peerTable.forEach(peer => {
                    if (ipAndPortMatch(peer.peerIP, peerElement.peerIP, peer.peerPort, peerElement.peerPort)) {
                        isInCurrentTable = true;
                    }
                });

                peerTableDeclined.forEach(declinedPeer => {
                    if (ipAndPortMatch(declinedPeer.peerIP, peerElement.peerIP, declinedPeer.peerPort, peerElement.peerPort)) {
                        peerIndeclinedTable = true;
                    }
                })

                if (!isInCurrentTable && !peerIndeclinedTable) {
                    // rejoin...
                }

            })
            newClientPeer.connect(
                peersToJoin[0].peerPort,
                peersToJoin[0].peerIP,
                function () {
                    // initialize peer table
                    let newPeerTable = []; // array of objects
                    communicate(newClientPeer, maxPeers, peerLocation, newPeerTable, peerTableDeclined);
                }
            );
        }
    });
}

// Handle the client
function handleClient(sock, sender, peerTable) {
    // send acknowledgment to the client
    cPTPpacket.init(7, 1, sender, peerTable);
    sock.write(cPTPpacket.getPacket());
    sock.end();

    // accept client request
    addClient(sock, peerTable);
}


// Decline the client
function declineClient(sock, sender, peerTable, peerDeclinedTable) {
    let peerAddress = sock.remoteAddress + ":" + sock.remotePort;
    console.log("\nPeer table full: " + peerAddress + " redirected");

    // send acknowledgment to the client
    cPTPpacket.init(7, 2, sender, peerTable);
    sock.write(cPTPpacket.getPacket());
    sock.end();
}

// Add the client to the peer table
function addClient(sock, peerTable) {

    //Add peer to table
    let joiningPeer = {peerIP: sock.remoteAddress, peerPort: sock.remotePort};
    peerTable.push(joiningPeer);

    let peerAddress = sock.remoteAddress + ":" + sock.remotePort;
    console.log("\nConnected from peer " + peerAddress);
}


// return integer value of a subset bits
function parseBitPacket(packet, offset, length) {
    let number = "";
    for (var i = 0; i < length; i++) {
        // let us get the actual byte position of the offset
        let bytePosition = Math.floor((offset + i) / 8);
        let bitPosition = 7 - ((offset + i) % 8);
        let bit = (packet[bytePosition] >> bitPosition) % 2;
        number = (number << 1) | bit;
    }
    return number;
}



