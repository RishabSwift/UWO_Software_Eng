// You may need to add some delectation here

let buffer;

module.exports = {
    init: function ({version, responseType, fileName}) {
        // Allocate enough size (based on the file) to store info about it
        buffer = Buffer.alloc(4 + Buffer.byteLength(fileName));

        buffer.writeUIntBE(version, 0, 3);
        buffer.writeUInt8(responseType, 3);
        buffer.write(fileName, 4, 'utf-8');
    },


    // Get the entire packet
    getEntirePacket: function () {
        return buffer;
    },

    //--------------------------
    //getBytePacket: returns the entire packet in bytes
    //--------------------------
    getBytePacket: function () {
        // enter your code here
        return buffer.length;
    },

    //--------------------------
    //getBitPacket: returns the entire packet in bits format
    //--------------------------
    getBitPacket: function () {
        // enter your code here
        return "this should be a correct packet";
    },
};

// Extra utility methods can be added here
