const CTPHandler = require('./CTPHandler');

const messageTypes = {
    welcome: 1,
    redirect: 2,
}

let peerTable = [];


function Peer(host, port) {
    this.host = host;
    this.port = port;
}


module.exports = {


    handleClientJoining: function ({sock, version, currDir, maxPeerSize, peerTable}) {
        let buffer;

        let packet = {
            version: version,
            dirName: currDir,
            messageType: null,
            numberOfPeers: null,
            containsPeerInfo: false,
        }

        // if the peer table is full...
        if (peerTable.length == maxPeerSize) {

            console.log(`Peer table full: ${sock.remoteAddress}:${sock.remotePort} redirected \n`);

            packet.messageType = messageTypes.redirect;
            packet.numberOfPeers = maxPeerSize;
            packet.containsPeerInfo = true;
            packet.peerHost = peerTable[0].host;
            packet.peerPort = peerTable[0].port;

            // send the packet back
            buffer = CTPHandler.preparePacket(packet);

        } else {
            console.log(`Connected from peer ${sock.remoteAddress}:${sock.remotePort}\n`);

            let peerNumber = peerTable.length > 0 ? 1 : 0;
            packet.numberOfPeers = peerNumber;

            if (peerTable.length > 0) {

                packet.messageType = messageTypes.welcome;
                packet.containsPeerInfo = true;
                packet.peerHost = peerTable[0].host;
                packet.peerPort = peerTable[0].port;
                buffer = CTPHandler.preparePacket(packet);
            } else {
                // if there is no table... it doesn't contain anything
                packet.containsPeerInfo = false;
                buffer = CTPHandler.preparePacket(packet);
            }

            peerTable.push(new Peer(sock.remoteAddress, sock.remotePort));
        }

        // when it ends
        sock.end(buffer);

        // when there is an error
        sock.on('error', error => {
            console.log('Error has occurred: ', error, '\n');
        });


    },
};



