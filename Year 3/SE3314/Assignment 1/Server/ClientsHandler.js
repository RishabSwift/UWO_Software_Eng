let fs = require('fs').promises;
let ITPpacket = require('./ITPResponse');
let singleton = require('./Singleton');

// You may need to add some delectation here
const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// parse the data that was sent from client
const parseData = function (data) {
    return {
        version: data.readUIntBE(0, 3),
        requestType: data.readUIntBE(3, 1),
        fileName: data.toString('utf-8', 4)
    }
}

// return an array with unique elements
const getUniqueElements = function (value, index, self) {
    return self.indexOf(value) === index;
}

// get only extensions
const getExtensionsFromFileNames = function (fileNames) {
    // get the extension from the period
    return fileNames.map((item) => {
        return item.split(".")[1];
    }).filter(getUniqueElements).join(",").toUpperCase();
}


// get only file names from the array of names
const getOnlyNameFromFileNames = function (fileNames) {
    // get the extension from the period
    return fileNames.map((item) => {
        return item.split(".")[0];
    }).join(",").toLowerCase();
}


// Convert text to binary and also pad it to 8 spaces
// only used for showing the packet headers
const text2Binary = function (string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}


module.exports = {

    handleClientJoining: function (sock) {

        let clientId = sock.remotePort;

        // get the timestamp and record it
        let initialTime = singleton.getTimestamp();

        // we're connected
        console.log(`Client-${clientId} is connected at timestamp: ${initialTime}\n`);

        // run this closure every time a packet is received
        sock.on('data', (data) => {

            // get the data and parse it
            let request = parseData(data);

            // Validate data...
            if (request.version === 7 && request.requestType === 0) {
                //log request information to console

                // split the file names by space. if there's a space then we know there are more than 1 files.
                let fileNames = request.fileName.trim().split(" ");

                // Prepare the packet
                let packet = {
                    version: request.version,
                    sequenceNumber: singleton.getSequenceNumber(),
                    timestamp: singleton.getTimestamp(),
                    imageBuffer: null,
                    responseType: 1, // 2 if error, 1 if success
                }

                // Loop through the files and send the file
                for (let fileName of fileNames) {

                    fileName = capitalizeFirstLetter(fileName);

                    // read the file and ensure it actually exists
                    fs.readFile(__dirname + `/images/${fileName}`)
                        .catch(err => {
                            // if it doesn't, then send with responseType of 2 so we don't read it in client side
                            packet.responseType = 2;
                        }).then(data => {

                        packet.imageBuffer = data;
                        ITPpacket.init(packet);
                        sock.write(ITPpacket.getPacket());
                    })

                }
                console.log('ITP packet received:');

                // Output the header
                let headerInBinary = "11100001 00000000 00000000 00000000 00110000";

                let nameInBinary = text2Binary(getOnlyNameFromFileNames(fileNames).split(",").join(' '));

                // prepare the header to be outputted in binary
                let packetHeaderString = "";
                let tcpPacketHeader = (headerInBinary + ' ' + nameInBinary).split(' ');
                let curr = 0;
                for (let i = 0; i < tcpPacketHeader.length; i++){
                    curr++;
                    let binary = tcpPacketHeader[i];
                    packetHeaderString += binary + ' ';

                    if (curr % 4 === 0) {
                        packetHeaderString+='\n';
                    }

                }
                console.log(packetHeaderString)

                // output the requested data
                console.log(`\nClient-${sock.remotePort} requests:`);

                console.log('   --ITP version: ' + request.version);
                console.log('   --Image Count: ' + fileNames.length);
                console.log('   --Request type: ' + 'QUERY'); // Query because it wouldn't be here otherwise
                console.log('   --Image file extension(s): ', getExtensionsFromFileNames(fileNames)); // Split by . and get extension
                console.log('   --Image file name(s): ', getOnlyNameFromFileNames(fileNames));
            }



        });

        // when it ends
        sock.on('end', () => {
            console.log(`\nClient-${clientId} closed the connection\n`);
        });

        // when there is an error
        sock.on('error', error => {
            console.log('Error has occurred: ', error, '\n');
        });


    },
};



