
#include "thread.h"
#include "socket.h"
#include <iostream>
#include <stdlib.h>
#include <time.h>

using namespace Sync;

int main(void)
{
	// Welcome the user 
	std::cout << "SE3313 Lab 3 Client" << std::endl;
	Sync::ByteArray user_data;
	// Create our socket
	std::string input = "";
	Socket socket("127.0.0.1", 3000);
	socket.Open();
	while(input != "done"){
		std::cin >> input;
			try{
				user_data = Sync::ByteArray(input);
				socket.Write(user_data);
				socket.Read(user_data);
				std::cout<< "returned ";
				std::cout << user_data.ToString() << std::endl;
			} catch(...){
				return 0;
			}
	}
	socket.Close();
	return 0;
}
