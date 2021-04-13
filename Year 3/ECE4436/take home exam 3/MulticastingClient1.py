import socket
import struct


def main():
    address = '10.0.0.137' # the address to use
    port = 1989 # the two ports to establish
    port2 = 1988

    server = ('', port)
    server2 = ('', port2)

    # set up socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    s2 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)

    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 255)
    s2.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 255)

    s.bind(server)
    s2.bind(server2)


    s.settimeout(3.1)
    s2.settimeout(3.1)

    mreq = struct.pack("4sl", socket.inet_aton(address), socket.INADDR_ANY)
    s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    s2.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)

    # Get data from server
    while True:
        try:
            data, address = s.recvfrom(1024)
        except:
            s.gettimeout()
        else:
            print('Client 1: Data received from: ', (address, port))
            print('and the Received Data is: ', data, '\n')

        try:
            data, address = s2.recvfrom(1024)
        except:
            s2.gettimeout()
        else:
            print('Client 1: Data received from: ', (address, port2))
            print('and the Received Data is: ', data, '\n')


if __name__ == '__main__':
    main()
