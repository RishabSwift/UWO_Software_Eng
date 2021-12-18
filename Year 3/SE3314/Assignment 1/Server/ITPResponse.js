let buffer;

module.exports = {

    init: function({ version, sequenceNumber, responseType, timestamp, imageSize, imageBuffer }) { // feel free to add function parameters as needed

        // allocate initial 16 for the buffer
        buffer = Buffer.alloc(16);
        buffer.writeUIntBE(version, 0, 3);
        buffer.writeUInt8(responseType, 3);
        buffer.writeUIntBE(sequenceNumber, 4, 4);
        buffer.writeUIntBE(timestamp, 8, 4);
        buffer.writeUIntBE(imageSize, 12, 4);
        // merge image data with the headers
        buffer = Buffer.concat([buffer, imageBuffer]);
    },

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getPacket: function() {
       return buffer;
    },


};

