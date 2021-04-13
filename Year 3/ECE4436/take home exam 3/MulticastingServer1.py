import socket
import time


def main():

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)

    s.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 255)

    while True:
        s.sendto(b'Multicasting Assignment ECE 4436 from Server 1', ('224.1.1.1', 1989))
        print('Server 1: Multicast packet is sent now')
        time.sleep(3)


if __name__ == '__main__':
    main()
