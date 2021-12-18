let net = require("net");
let fs = require("fs").promises;
let open = require("open");
let ITPpacket = require("./ITPRequest");
const minimist = require('minimist');


// Enter your code for the client functionality here
const arguments = minimist(process.argv);

// get the name from argument
let names = arguments['q'];
// if our first attr received [_] is more than 2 in length... (if more than 1 file)
if (arguments['_'].length > 2) {
    let _fileName = '';
    // we know the first two files are not important as they contain the 'node' and the current dir
    // so if we have more than 2 items in the [_] arg, then we know it contains additional file names
    // unless it was all included after the -q in ""
    // so if it's not, then go ahead and
    for (let i = 2; i < arguments['_'].length; i++) {
        _fileName += arguments['_'][i] + ' ';
    }
    names = arguments['q'] + ' ' + _fileName;
}

let serverInfo = arguments['s'].split(':');
let host = serverInfo[0];
let port = serverInfo[1];
let fileName = names.trim();
let version = arguments['v'];
let allFileNames = fileName.split(' ');


// Convert text to binary and also pad it to 8 spaces
// only used for showing the packet headers
const text2Binary = function (string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

//initialize ITP packet from command line arguments
ITPpacket.init({version, responseType: 0, fileName});

//create socket, establish connection with the server and send request packet
let client = new net.Socket();

client.connect(port, host, () => {
    console.log(`Connected to ImageDB server on: ${host}:${port}\n`)
    client.write(ITPpacket.getEntirePacket());
})

let imagesReceived = 0;


// When client receives the data from server
client.on('data', data => {

    let response = parseData(data); //parse response packet

    let tempFileName = allFileNames[imagesReceived];
    imagesReceived++;




    if (response.responseType === 1) {
        fs.writeFile(tempFileName, response.image).then(() => {
            open(tempFileName, {wait: true});
        })
    } else {
        // console.log('Error occurred')
    }

    // show this after all images have been received
    if (allFileNames.length === imagesReceived) {

        let header = response.version.toString() + (response.responseType.toString()) +  (response.sequenceNumber.toString()) + (response.timestamp.toString());
        header = text2Binary(header);
        let packetHeader = header.split(" ");
        let packetHeaderString = '';

        // output header file
        let curr = 0;
        for (let i = 0; i < packetHeader.length; i++){
            curr++;
            let binary = packetHeader[i];
            packetHeaderString += binary + ' ';

            if (curr % 4 === 0) {
                packetHeaderString+='\n';
            }

        }

        console.log('ITP packet header received:');
        console.log(packetHeaderString);

        console.log('\nServer sent:');
        console.log('   --ITP version = ' + response.version);
        console.log('   --Fulfilled = ' + response.fulfilled);
        console.log('   --Response Type = ' + response.responseType);
        console.log('   --Image Count = ' + imagesReceived);
        // console.log('   --Image Size = ' + response.imageSize);
        console.log('   --Sequence Number = ' + response.sequenceNumber);
        console.log('   --Timestamp = ' + response.timestamp);
        client.end();
    }

});

//server ends the connection
client.on('end', () => {
    console.info('\nDisconnected from server.');
});


//socket closes
client.on('close', () => {
    console.info('Connection closed\n');
});


const parseData = function (data) {
    return {
        version: data.readUIntBE(0, 3),
        responseType: data.readUIntBE(3, 1),
        sequenceNumber: data.readUIntBE(4, 4),
        timestamp: data.readUIntBE(8, 4),
        imageSize: data.readUIntBE(12, 4),
        imageCount: 0, // initially 0
        fulfilled: 'Yes',
        image: data.slice(16),
    }
}
