from socket import *
import time
import statistics

server = '127.0.0.1'
port = 12000

totalTime = 0 # initially zero

elapsedTimeArr = [] #array of time elapsed to calculate min, max, etc time at the end

for pings in range(1,11):

    clientSocket = socket(AF_INET, SOCK_DGRAM)
    clientSocket.settimeout(2)
    message = input('Input lowercase sentence:')
    clientSocket.sendto(message.encode(),(server, port))
    startTime = time.time()

    try:
        modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
        endTime = time.time()
        timeElapsed = endTime-startTime
        elapsedTimeArr.append(timeElapsed)
        totalTime += timeElapsed

        print(f'{modifiedMessage.decode()}   •    Ping #{pings}     •    Time elapsed:{timeElapsed}')
    except timeout:
        print('Client request timed out')


    if message == 'done' :
        break

clientSocket.close()

avgTime = totalTime/len(elapsedTimeArr)

print(f'\n\nMax time: {max(elapsedTimeArr)}')
print(f'Min time: {min(elapsedTimeArr)}')
print(f'Average time: {avgTime}')
print(f'Standard deviation: {statistics.stdev(elapsedTimeArr)}')
print(f'Packet loss: {1 - len(elapsedTimeArr)/10}')

