#include <iostream>
#include "thread.h"
#include "SharedObject.h"
#include "Semaphore.h"

using namespace std;

struct MyShared{
	int threadId;
	int reportId;
	int timeDelay;
};

class WriterThread : public Thread{
	public:
		int 	threadId;
		int		reportId;	
		int		timeDelay;
		bool	flag;
		
		WriterThread(int tid, int rid, int tdelay) : Thread(8*1000){
			this->threadId = tid;
			this->reportId = rid;
			this->timeDelay = tdelay;
		}


		virtual long ThreadMain(void) override{
			//declare shared memory var so this thread can access it
			Shared<MyShared> sharedMemory ("sharedMemory");
			Semaphore* semaphoreReadMemory = new Semaphore("semaphoreReadMemory"); 
			Semaphore* semaphoreWriteMemory = new Semaphore("semaphoreWriteMemory"); 
			
			while(true)
			{
				
				// Write to shared memory..
				usleep(this->timeDelay * 1000000);
				semaphoreWriteMemory->Wait();
				sharedMemory->threadId = this->threadId;
				sharedMemory->reportId = this->reportId;
				sharedMemory->timeDelay = this->timeDelay;
				semaphoreReadMemory->Signal();
				this->reportId++;

				if(flag){
					break;
				}
			}
			return 0;
		}
};

int main(void)
{
	int threadNum=0;
	int reportNum=0;
	int delayTime;

	std::cout << "Writer" << std::endl;

	// vector so that don't have to specify size
	vector<WriterThread*> threadList;
	
	
	Shared<MyShared> sharedMemory("sharedMemory", true); 
	Semaphore* semaphoreWriteMemory = new Semaphore("semaphoreWriteMemory",1,true);
	Semaphore* semaphoreReadMemory = new Semaphore("semaphoreReadMemory",0,true); 
	WriterThread* threadWriter;

	while(true){
		


		string input = "";
		//create thread using user input
		cout << "Write a thread? (y/n)" << endl;
		cin >> input;
		if(input == "y"){
			cout << "Type a delay for this thread (sec)" << endl;
			cin >> delayTime;
			threadNum++;
			threadWriter = new WriterThread(threadNum,reportNum,delayTime); 
			threadList.push_back(threadWriter);
		}
		else{
			break;
		}
		
		
	}
	
	// clear the vector
	while(!(threadList.empty())){
		threadList.back()->flag = true;
		delete threadList.back();
		threadList.pop_back();
	}
	
	return 0;
}

