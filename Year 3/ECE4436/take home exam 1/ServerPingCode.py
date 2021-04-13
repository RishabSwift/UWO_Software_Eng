from socket import *
import random

serverPort = 12000
serverSocket = socket(AF_INET, SOCK_DGRAM) # set up socket
serverSocket.bind(('', serverPort)) # port 

print ("The server is ready to receive")
while True:
    randInt = random.randint(0, 10)

    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    if randInt < 3:
        continue
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
