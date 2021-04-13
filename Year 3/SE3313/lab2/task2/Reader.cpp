#include <iostream>
#include "SharedObject.h"
#include "Semaphore.h"
using namespace std;

struct MyShared{ 
	int threadId;
	int reportId;
	int timeDelay;
};

int main(void)
{
	std::cout << "CURRENT READER" << std::endl;

	Shared<MyShared> sharedMemory ("sharedMemory"); 
	Semaphore* semaphoreWriteMemory = new Semaphore("semaphoreWriteMemory");
	Semaphore* semaphoreReadMemory = new Semaphore("semaphoreReadMemory"); 


	while(true){
		semaphoreReadMemory->Wait();
		
		

		cout << "Thread Report: Thread ID: " << sharedMemory->threadId << " Report ID: " << sharedMemory->reportId << " Time Delay " << sharedMemory->timeDelay <<endl;


		semaphoreWriteMemory->Signal();
	}
	return 0;
}
