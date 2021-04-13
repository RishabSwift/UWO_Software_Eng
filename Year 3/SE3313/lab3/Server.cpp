#include "thread.h"
#include "socketserver.h"
#include <stdlib.h>
#include <time.h>
#include <list>
#include <vector>
#include <algorithm>


using namespace Sync;
using namespace std;

class SocketThreadIndividually : public Thread
{
private:
    Socket& ind_socket;
    Sync::ByteArray inc_data;
public:
    bool threadState = true;  
    SocketThreadIndividually(Socket& socket)
    : ind_socket(socket)
    {
    }

    ~SocketThreadIndividually()
    {
     
    }

    virtual long ThreadMain()
    {   
        // Wait for a client socket connection
        while(this->threadState){
            try{
                ind_socket.Read(inc_data);
                if(inc_data.ToString() == ""){
                    ind_socket.Write(inc_data);
                    break;
                } //stops checking thread if client terminates
                string recv = inc_data.ToString();
                recv += " is totally different...";
                // Send it back
                Sync::ByteArray sen_data = Sync::ByteArray(recv);
                ind_socket.Write(sen_data);
            } catch(...) {
                
            }
        }
        return 0;
    }
};



// This thread handles the server operations
class ServerThread : public Thread
{
private:
    SocketServer& server;
    bool threadState = true;
    vector<SocketThreadIndividually*> threadList;
public:
    ServerThread(SocketServer& server)
    : server(server)
    {
    }

    ~ServerThread()
    {
        // Cleanup
        cout << "Cleaning up threads!" << endl;
        cout.flush();
        this->threadState = false;
        while(!(threadList.empty())){
            threadList.back()->threadState = false;
            threadList.pop_back();
        }
	//...
    }

    virtual long ThreadMain()
    {   
        // Wait for a client socket connection
        
        while(this->threadState){
            try{
                Socket* newConnection = new Socket(server.Accept());
                // A reference to this pointer 
                Socket& socketReference = *newConnection;
                threadList.push_back(new SocketThreadIndividually(socketReference));
            } 
            catch(TerminationException error) {
                return error;
            } 
            catch(...) {
                return 1;
            }
        }
        return 1;
    }
};


int main(void)
{
    cout << "I am a server." << endl;
    // Create our server
    SocketServer server(3000);    
    // Need a thread to perform server operations
    ServerThread serverThread(server);
    // This will wait for input to shutdown the server
    FlexWait cinWaiter(1, stdin);
    cinWaiter.Wait();
    cin.get();
    // Shut down and clean up the server
    server.Shutdown();
    //kill processes
    return 0;
}
