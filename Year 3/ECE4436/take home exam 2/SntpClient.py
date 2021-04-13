import socket
import struct
import sys
import time

NTP_SERVER = '0.ca.pool.ntp.org' #specify server

# Timestamp reference to 1970-Jan-01 - 1990-Jan-01
TIME1970 = 2208988800

def sntp_client(): # Client function

    client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP client socket

    # Data of 48 bytes, leap indicator 0, VN 3 NTP, client mode
    data = '\x1b' + 47 * '\0'

    client.sendto(str.encode(data), (NTP_SERVER, 123)) # encode as utf-8 

    # store data and address... if we receive data we know we got it
    data, address = client.recvfrom(1024)

    # print response 
    if data:
        print('Response recevied from address: ', address)

    # unpack the data and store it in variable
    t = struct.unpack('!12I', data)[10] - TIME1970
    print ('\tTime=%s' % time.ctime(t)) # print 

#__name__ gets value depending on how script is executed
if __name__ == '__main__':
    sntp_client() # run main program

   
