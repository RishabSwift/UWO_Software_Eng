/**
 *
 * Helper function for converting IP address to integer
 * Source: https://gist.github.com/jppommet/5708697
 * @param ip
 * @returns {number}
 */
const convertIpToInt = (ip) => {
    let ipAddress = ip.split('.');
    return ipAddress.reduce(function (_ip, octet) {
        return (_ip << 8) + parseInt(octet, 10)
    }, 0) >>> 0;
}

/**
 * Helper function for converting (long) integer to IP address
 * Source: https://gist.github.com/jppommet/5708697
 * @param ipInteger
 * @returns {string}
 */
const convertIntToIp = (ipInteger) => {
    return `${ipInteger >>> 24}.${ipInteger >> 16 & 255}.${ipInteger >> 8 & 255}.${ipInteger & 255}`
}


module.exports = {

    preparePacket: (packet) => {

        console.log('packet', packet);
        let buffer;

        if (!packet.containsPeerInfo) {
            buffer = Buffer.alloc(12);
            buffer.writeUIntBE(packet.version, 0, 3);
            buffer.writeUInt8(packet.messageType, 3);
            buffer.write(packet.dirName, 4, 5, 'utf-8',);
            buffer.writeUInt32BE(packet.numberOfPeers, 8);

        } else {
            //has entry in peer table, include the first one in response packet
            buffer = Buffer.allocUnsafe(20);

            buffer.writeUIntBE(packet.version, 0, 3);
            buffer.writeUInt8(packet.messageType, 3);
            buffer.write(packet.dirName, 4, 5);
            buffer.writeUInt32BE(packet.numberOfPeers, 8);

            buffer.writeUInt16BE(packet.peerPort, 14);
            buffer.writeInt32BE(convertIpToInt(packet.peerHost), 16);
        }

        return buffer;

    },

    parseData: (data) => {

        let parsed = {
            version: data.readUIntBE(0, 3),
            messageType: data.readUIntBE(3, 1),
            dirName: data.toString('utf-8', 4, 9),
            numberOfPeers: data.readUIntBE(8, 4),
            peerPort: null,
            peerHost: null,
            containsPeerInfo: false,
        }
        let containsPeerInfo = parsed.numberOfPeers > 0;

        if (containsPeerInfo) {
            parsed.containsPeerInfo = containsPeerInfo
            parsed.peerHost = convertIntToIp(data.readInt32BE(16));
            parsed.peerPort = data.readUIntBE(14, 2);
        }

        console.log(parsed);

        return parsed;
    }


}
